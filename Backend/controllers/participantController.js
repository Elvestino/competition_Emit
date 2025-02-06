const path = require('path');
const multer = require('multer');
const participantService = require('../services/participantService');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext)
        const timestamp = Date.now();
        const filename = `${timestamp} ${nameWithoutExt} ${ext}`;
        cb(null, Date.now() + ext);
    }
});

const upload = multer({ storage: storage});

async function uploadFiles(req, res) {
    try {
        const pdfPath = req.files['pdf'][0].path;
        const mp3Path = req.files['mp3'][0].path;

        const participant = await participantService.createParticipant(pdfPath, mp3Path);

        res.json({ participantID: participant.id });
    } catch(error){
        console.error('erreur ajout', error);
        res.status(500).send('erreur serveur');
    }
}

async function getParticipants(req, res) {
    try {
        const participants = await participantService.getAllParticipants();
        res.json(participants);
    } catch(error) {
        console.error('erreur de la recuperation des participants');
        res.status(500).send('erreur serveur');
    }
}

async function deleteParticipant(req, res) {
    
}

module.exports = { uploadFiles, getParticipants, upload};
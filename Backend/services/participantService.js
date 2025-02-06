const { v4: uuidv4 } = require("uuid");
const Participant = require("../models/participants");


async function createParticipant(pdfPath, mp3Path) {
    const participantID = Math.floor(1000 + Math.random() * 9999);

    const participant = await Participant.create({
        id: participantID,
        pdf: pdfPath,
        mp3: mp3Path,
        timestamp: new Date(),
    })

    return participant;
}

async function getAllParticipants() {
    return await Participant.findAll();
}

module.exports = { createParticipant, getAllParticipants };
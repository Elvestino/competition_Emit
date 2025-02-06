const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');

router.post('/upload', participantController.upload.fields([{ name: 'pdf'}, { name: 'mp3'}]), participantController.uploadFiles);

router.get('/admin/listes', participantController.getParticipants );

module.exports = router;
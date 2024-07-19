const express = require('express');
const router = express.Router();
const addNote = require('../controllers/addNoteController');

router.post('/', addNote.addNote);

module.exports = router;
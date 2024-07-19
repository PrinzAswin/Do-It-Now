const Notes = require('../model/Notes.model');
require('dotenv').config();

async function addNote(req, res) {
    const { title, content, tags } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    if (!content) {
        return res.status(400).json({ message: "Content is required" });
    }

    try {
        const note = await Notes.create({
            title,
            content,
            tags: tags || []
        });

        // await note.save(); 

        res.status(201).json({ message: "Note added successfully!", note });
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: "Internal error" });
    }
}

module.exports = { addNote };
/* const Notes = require('../model/Notes');
require('dotenv').config();


async function editNote(req, res) {
    const noteId = req.params.noteId;
    const { title, content, tags, ispinned } = req.body;

    if (!title && !content && !tags) return res.status(400).json({ message: "No Changes provided" });

    try {
        const note = await Notes.findOne({ _id: noteId });
        if (!note) return res.status(404).json({ message: "Note not found" });

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (ispinned) note.ispinned = ispinned;

        await note.save();
        return res.json({ note, message: "Note updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: "internal error" });
    }
}

module.exports = { editNote } */
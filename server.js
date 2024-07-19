require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


//imported files 
const connectDB = require('./configs/connectDB.js');
const corsOptions = require('./configs/corsOptions.js');
const cookieParser = require('cookie-parser');
const verifyAccessToken = require('./middleware/verifyaccesstoken.js');
const Notes = require('./model/Notes.model.js');
const users = require('./model/Users.model.js');

//mongoDB connection
connectDB;
const PORT = process.env.PORT || 3500;

//CORS
app.use(require('./middleware/credential.js'));
app.use(cors(corsOptions));

//express and imageEncoding 

app.use(express.json())
app.use(cookieParser());


// routers
app.use('/reg', require('./routers/register.js'));
app.use('/login', require('./routers/login.js'));
app.use('/note', require('./routers/addNote.js'));

//edit note
app.put('/edit/:noteId', async(req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, ispinned } = req.body;
    // const { user } = req.user;

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
});
//Get all notes
app.get('/all-notes', async(req, res) => {
    try {
        const userId = req.params.userId;
        const notes = await Notes.find({ userId }).sort({ ispinned: -1 });
        return res.json({ message: "All notes retrieved successfully", notes });
    } catch (err) {
        return res.status(500).json({ message: "Internal error" });
    }
});

//delete note
app.delete('/delete/:noteId', async(req, res) => {
    const noteId = req.params.noteId;

    try {
        const note = await Notes.findOneAndDelete({ _id: noteId });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.json({ message: "Note deleted successfully", note });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal error" });
    }
});

//is pinned
app.put('/note-pinned/:noteId', async(req, res) => {

    const noteId = req.params.noteId;
    const { ispinned } = req.body;

    try {
        const note = await Notes.findOne({ _id: noteId });
        if (!note) return res.status(404).json({ message: "Note not found" });

        note.ispinned = ispinned;

        await note.save();
        return res.json({ note, message: "Note pinned successfully" });
    } catch (err) {
        return res.status(500).json({ message: "internal error" });
    }
});

//authentications
app.use('/ref', require('./routers/verifyRefToken.js'));
app.use(verifyAccessToken);

//Running ports and server
mongoose.connection.on('connected', () => {
    console.log('connected to MongoDB!!!');
    app.listen(PORT, console.log(`Server is running on ${PORT}`));
});
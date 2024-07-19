const bcrypt = require('bcrypt');
const users = require('../model/Users.model');
require('dotenv').config();

async function reg(req, res) {
    const { username, email, password } = req.body;

    if (!username) return res.status(401).json({ message: "Username is missing!" });
    if (!email) return res.status(401).json({ message: "Email is missing!" });
    if (!password) return res.status(401).json({ message: "Password is missing!" });

    const foundName = await users.findOne({ username: username }).exec();
    const foundEmail = await users.findOne({ email: email }).exec();

    if (foundName || foundEmail) return res.status(400).json({ message: "User already is Registered! Please login!" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await users.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        // console.log(newUser);
        res.status(201).json({ message: "Registered Successfully!!" });

    } catch (err) {
        return res.status(404).json(err);
    }
}

module.exports = { reg }
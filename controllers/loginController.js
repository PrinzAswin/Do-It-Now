const bcrypt = require('bcrypt');
const users = require('../model/Users.model');
const jwt = require('jsonwebtoken');

async function loginController(req, res) {
    const { email, password } = req.body;

    //if not provided email and password
    if (!email && !password) return res.status(401).json({ message: "Please enter required details!" });
    else if (!email) return res.status(401).json({ message: "Please enter Email." });
    else if (!password) return res.status(401).json({ message: "Please enter Password." });

    //user email recorded
    const foundEmail = await users.findOne({ email: email }).exec();

    //user not found!
    if (!foundEmail) return res.status(401).json({ message: "User not found! Please Register" }).exec();

    //checking user's correct password
    const checkPassword = await bcrypt.compare(password, foundEmail.password);

    //Refresh token
    if (foundEmail && checkPassword) {
        try {
            const accessToken = jwt.sign({ "username": foundEmail.username }, process.env.ACCESS_TOKEN, { expiresIn: '3d' });
            console.log(accessToken);
            return res.json({ message: "Login Successfully", email, accessToken });

        } catch (err) {
            return res.json(err);
        }

        //password is wrong
    } else {
        res.status(400).json({ message: "no credential found" });
    }
}

module.exports = { loginController }
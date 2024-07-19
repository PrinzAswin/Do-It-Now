require('dotenv').config();
const jwt = require('jsonwebtoken');
const users = require('../model/Users.model.js');

async function refTokenVerify(req, res) {
    const refresh = req.cookies.jwt;

    if (!refresh) return res.status(400).json({ message: "Your Session is Expired, please login one more time!" });

    const foundName = await users.findOne({ refreshToken: refresh }).exec();

    if (foundName) {
        try {
            jwt.verify(refresh, process.env.REFRESH_TOKEN, (err, decoded) => {

                if (err || decoded.username !== foundName.username) {
                    return res.sendStatus(403);
                }

                const accessToken = jwt.sign({ "username": foundName.username }, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
                console.log(accessToken);
                return res.json({ accessToken });

            });
        } catch (err) {
            console.error(err);
        }
    } else {
        res.sendStatus(401);
    }
}

module.exports = { refTokenVerify };
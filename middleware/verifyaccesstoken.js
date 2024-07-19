const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'no token' });

    console.log(authHeader);

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Your Session is Expired, please login one more time!' });
            req.user = decoded.username;
            next();
        },
    );
}

module.exports = verifyJWT;
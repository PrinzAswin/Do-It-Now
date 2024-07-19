const allowedOrigin = require('./allowedOrigin');

const corsOptions = {
    origin: function(origin, callback) {

        if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('not allowed by Aswin.'));
        }
    },
    optionSuccessStatus: 200,
    Credential: "true",
    methods: ["GET", "POST", "PATCH", "DELETE"]
}

module.exports = corsOptions;
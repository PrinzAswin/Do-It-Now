const express = require('express');
const Router = express.Router();
const refTokenVerify = require('../controllers/refTokenController');

Router.get('/', refTokenVerify.refTokenVerify);

module.exports = Router;
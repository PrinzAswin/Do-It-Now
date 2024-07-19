const express = require('express')
const router = express.Router();
const reg = require('../controllers/registercontroller');


//registration with profile

router.post('/', reg.reg);

module.exports = router;
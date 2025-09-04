const express = require('express');
const { createUser, getAllUsers } = require('../controller/user.controller');
const { middleWare } = require('../middleware');
const router = express.Router();

router.post('/', createUser);
router.get('/', middleWare,  getAllUsers);
module.exports = router;
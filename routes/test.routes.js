const express = require('express');
const { getSomeRes, someData } = require('../controller/testing.controller');

const router = express.Router();

router.get('/', getSomeRes);
router.post('/:id', someData);
module.exports = router;
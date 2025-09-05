const express = require('express');
const { fileUploads } = require('../controller/multer.controller');
const router = express.Router()


router.post('/:id', fileUploads);
module.exports = router;
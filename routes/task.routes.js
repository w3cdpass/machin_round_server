const express = require('express');
const { getAllTask, createTask, deleteTask, putNewField, patchField } = require('../controller/task.controller');
const { middleWare } = require('../middleware');
const { fileUploads } = require('../controller/multer.controller');
const router = express.Router()

/** to all routes uncomment this  */
// router.use(middleWare)

/** for indi */
router.post('/', middleWare, createTask);
router.post('/:id/uploads', fileUploads)
router.get('/', getAllTask);
router.route('/:id')
    .delete(middleWare, deleteTask)
    .put(middleWare, putNewField)
    .patch(middleWare, patchField)
module.exports = router;
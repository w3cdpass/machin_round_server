const express = require('express');
const { getAllTask, createTask, deleteTask, putNewField, patchField } = require('../controller/task.controller');
const router = express.Router()


router.post('/', createTask);
router.get('/', getAllTask);
router.route('/:id')
    .delete(deleteTask)
    .put(putNewField)
    .patch(patchField)
module.exports = router;
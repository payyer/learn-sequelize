const express = require('express');
const groupController = require('../controller/groupController');
const router = express.Router();

router.get('/', groupController.getAllGroup);
router.post('/', groupController.createGroup);
router.delete('/:id', groupController.deleteGroup);


module.exports = router;
const express = require('express');
const controller = require('../controllers/todoController.js');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ dest: './public/data/uploads/' });

router.route("/api/dataops/getData")
.get(controller.getData);

module.exports = router;
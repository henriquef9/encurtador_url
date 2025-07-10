const express = require('express');

const router = express.Router();

const urlsController = require('../controllers/shortUrlsController');

router.get('/:shortCode', urlsController.show);
router.post('/', urlsController.store);

module.exports = router;
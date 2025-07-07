const express = require('express');

const router = express.Router();

const urlsController = require('../controllers/shortUrlsController');

router.get('/urls/:shortCode', urlsController.show);
router.post('/urls', urlsController.store);

module.exports = router;
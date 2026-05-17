const express = require('express');
const { generatePost, suggestDestination } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/generate-post', protect, generatePost);
router.post('/suggest-destination', protect, suggestDestination);

module.exports = router;

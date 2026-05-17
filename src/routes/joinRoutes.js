const express = require('express');
const { sendRequest, getRequestsForPost, updateRequest } = require('../controllers/joinController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, sendRequest);
router.get('/:postId', protect, getRequestsForPost);
router.put('/:id', protect, updateRequest);

module.exports = router;

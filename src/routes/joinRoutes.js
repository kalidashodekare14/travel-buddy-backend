const express = require('express');
const { sendRequest, getRequestsForPost, updateRequest, getMyRequests, cancelRequest, getReceivedRequests } = require('../controllers/joinController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, sendRequest);
router.get('/my-requests', protect, getMyRequests);
router.get('/received-requests', protect, getReceivedRequests);
router.get('/:postId', protect, getRequestsForPost);
router.put('/:id', protect, updateRequest);
router.delete('/:id', protect, cancelRequest);

module.exports = router;

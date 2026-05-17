const express = require('express');
const { getProfile, updateProfile, uploadAvatar } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { uploadAvatar: uploadAvatarMiddleware } = require('../middleware/upload');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/avatar', protect, uploadAvatarMiddleware.single('avatar'), uploadAvatar);

module.exports = router;

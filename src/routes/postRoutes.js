const express = require('express');
const { createPost, getPosts, getPost, updatePost, deletePost, getMyPosts } = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const { uploadPostImage } = require('../middleware/upload');

const router = express.Router();

router.post('/', protect, uploadPostImage.single('image'), createPost);
router.get('/', getPosts);
router.get('/my-trips', protect, getMyPosts);
router.get('/:id', getPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;

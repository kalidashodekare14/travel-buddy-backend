const JoinRequest = require('../models/JoinRequest');
const Post = require('../models/Post');

const sendRequest = async (req, res) => {
  try {
    const { postId } = req.body;
    console.log('checking postId', postId);

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.createdBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot send request to own post' });
    }

    const existing = await JoinRequest.findOne({
      post: postId,
      sender: req.user._id,
    });
    if (existing) {
      return res.status(400).json({ message: 'Request already sent' });
    }

    const request = await JoinRequest.create({
      post: postId,
      sender: req.user._id,
      receiver: post.createdBy,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequestsForPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const requests = await JoinRequest.find({ post: req.params.postId })
      .populate('sender', 'name avatar');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRequest = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await JoinRequest.findById(req.params.id).populate('post');
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    if (request.post.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    request.status = status;
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendRequest, getRequestsForPost, updateRequest };

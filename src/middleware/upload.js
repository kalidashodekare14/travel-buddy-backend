const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'travel-buddy/avatars',
    allowed_formats: ['jpeg', 'jpg', 'png', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const postStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'travel-buddy/posts',
    allowed_formats: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit' }],
  },
});

const uploadAvatar = multer({ storage: avatarStorage, limits: { fileSize: 5 * 1024 * 1024 } });
const uploadPostImage = multer({ storage: postStorage, limits: { fileSize: 10 * 1024 * 1024 } });

module.exports = { uploadAvatar, uploadPostImage };

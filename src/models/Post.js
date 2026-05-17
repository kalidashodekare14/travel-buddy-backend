const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    travelDate: {
      type: Date,
      required: [true, 'Travel date is required'],
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    peopleNeeded: {
      type: Number,
      required: [true, 'Number of people is required'],
      min: 1,
    },
    image: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);

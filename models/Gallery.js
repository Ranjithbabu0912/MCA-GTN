const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    default: 'Events'
  },
  categoryLabel: {
    type: String,
    default: 'Events'
  },
  caption: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: 'Recent'
  },
  themeColor: {
    type: String,
    default: '#102A54'
  },
  icon: {
    type: String,
    default: 'fa-award'
  },
  image: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', GallerySchema);

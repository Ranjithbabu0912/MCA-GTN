const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
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
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  displayDate: {
    type: String,
    default: () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  },
  isImportant: {
    type: Boolean,
    default: false
  },
  isLatest: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    default: 'General'
  },
  description: {
    type: String,
    required: true
  },
  linkText: {
    type: String,
    default: 'View Details'
  },
  linkUrl: {
    type: String,
    default: 'announcements.html'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Announcement', AnnouncementSchema);

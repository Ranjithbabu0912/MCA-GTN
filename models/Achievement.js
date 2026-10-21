const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  eventId: {
    type: String,
    default: null
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  badge: {
    type: String,
    default: 'ACHIEVEMENT'
  },
  badgeType: {
    type: String,
    enum: ['gold', 'cyan', 'emerald', 'purple', 'blue'],
    default: 'gold'
  },
  category: {
    type: String,
    default: 'Competition'
  },
  type: {
    type: String,
    default: 'prize'
  },
  awardTitle: {
    type: String,
    default: ''
  },
  recipient: {
    type: String,
    default: ''
  },
  studentClass: {
    type: String,
    default: 'MCA'
  },
  students: {
    type: [String],
    default: []
  },
  venue: {
    type: String,
    default: 'G.T.N. Arts College'
  },
  organizer: {
    type: String,
    default: 'Department of MCA'
  },
  date: {
    type: String,
    default: null
  },
  dateDisplay: {
    type: String,
    default: 'Recent'
  },
  year: {
    type: mongoose.Schema.Types.Mixed,
    default: '2025-2026'
  },
  status: {
    type: String,
    default: 'completed'
  },
  description: {
    type: String,
    default: ''
  },
  studentName: {
    type: String,
    default: ''
  },
  companyOrOrg: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: 'assets/images/placeholder.jpg'
  },
  highlights: {
    type: [String],
    default: []
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', AchievementSchema);

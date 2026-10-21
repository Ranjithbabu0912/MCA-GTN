const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
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
  slug: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'Department Event'
  },
  categories: {
    type: [String],
    default: ['Department Event']
  },
  date: {
    type: String,
    default: null
  },
  dateDisplay: {
    type: String,
    default: 'Upcoming'
  },
  year: {
    type: Number,
    default: 2026
  },
  endDate: {
    type: String,
    default: null
  },
  startTime: {
    type: String,
    default: '09:30 AM'
  },
  endTime: {
    type: String,
    default: '04:30 PM'
  },
  venue: {
    type: String,
    default: 'MCA Department Seminar Hall'
  },
  organizer: {
    type: String,
    default: 'Department of Master of Computer Applications'
  },
  resourcePerson: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  chiefGuests: {
    type: mongoose.Schema.Types.Mixed,
    default: []
  },
  participants: {
    type: String,
    default: 'MCA Postgraduate Scholars & Faculty'
  },
  description: {
    type: String,
    default: ''
  },
  objective: {
    type: String,
    default: ''
  },
  highlights: {
    type: [String],
    default: []
  },
  time: {
    type: String,
    default: ''
  },
  speaker: {
    type: String,
    default: ''
  },
  registrationLink: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);

const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  order: {
    type: Number,
    default: 1
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  roleTitle: {
    type: String,
    default: 'Assistant Professor'
  },
  qualifications: {
    type: String,
    default: ''
  },
  qualification: {
    type: String,
    default: ''
  },
  designation: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['HOD', 'Faculty'],
    default: 'Faculty'
  },
  initials: {
    type: String,
    default: 'FA'
  },
  department: {
    type: String,
    default: 'Department of Master of Computer Applications (MCA)'
  },
  officeLocation: {
    type: String,
    default: 'MCA Department Block, Ground Floor'
  },
  phone: {
    type: String,
    default: '+91 (0451) 2431299 / Ext. MCA'
  },
  officeHours: {
    type: String,
    default: 'Monday - Friday | 09:30 AM - 04:30 PM'
  },
  email: {
    type: String,
    default: 'faculty.mca@gtnartscollege.ac.in'
  },
  fullAddress: {
    type: String,
    default: 'MCA Department Block, Ground Floor, G.T.N. Arts College (Autonomous), Old Karur Road, Dindigul - 624 005.'
  },
  contactStatus: {
    type: String,
    default: 'Official consultations coordinated through Department Office'
  },
  academicStatus: {
    type: String,
    default: 'Faculty Member'
  },
  avatarColor: {
    type: String,
    default: 'linear-gradient(135deg, #0B1D3A 0%, #0077B6 100%)'
  },
  image: {
    type: String,
    default: 'assets/images/Prof 1.png'
  },
  experience: {
    type: String,
    default: '10+ Years'
  },
  summary: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  specializations: {
    type: [String],
    default: []
  },
  specialization: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  courses: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Faculty', FacultySchema);

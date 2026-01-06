const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
  name: String,
  govt_id: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: 'expert',
  },
  dept: String,
  dob: String,
  gender: String,
  mobile_no: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  landmark: String,
  address: String,
  city: String,
  district: String,
  state: String,
  pincode: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  education: String,
  experience: String,
  whyJoin: String,
  rating: {
    type: String,
    default: '0',
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  certified: {
    type: Boolean,
    default: false,
  },
  password: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },
  doc: [
    {
      name: String,
      type: String,
      url: String,
    },
  ],
  history: [
    {
      service_id: String,
      user_id: String,
      date: String,
      service_name: String,
      status: String,
    },
  ],
});
expertSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('experts', expertSchema);

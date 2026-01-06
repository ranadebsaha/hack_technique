const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  user_id: String,
  user_name: String,
  expert_id: String,
  mobile_no: String,
  email: String,
  service_name: String,
  service_des: String,
  payment_type: String,
  payment_amount: String,
  remarks: String,
  landmark: String,
  address: String,
  city: String,
  district: String,
  state: String,
  feedback: String,
  rating:String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: false
    }
  },
  female_preference: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "rejected", "done"],
    default: "pending"
  },
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: String,
  },
  solved_date: {
    type: Date,
  },
  solved_time: {
    type: String,
  },
});

serviceSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("services", serviceSchema);
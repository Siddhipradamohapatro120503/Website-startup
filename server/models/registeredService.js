const mongoose = require('mongoose');

const registeredServiceSchema = new mongoose.Schema({
  serviceId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  duration: String,
  category: String,
  features: [String],
  technologies: [String],
  useCases: [String],
  iconName: String,
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  formData: {
    preferredDate: String,
    preferredTime: String,
    specialRequirements: String,
    paymentMethod: String
  }
});

module.exports = mongoose.model('RegisteredService', registeredServiceSchema);

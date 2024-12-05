const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/startup-platform';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

module.exports = mongoose;

const mongoose = require('mongoose')

//// secrets fixes
const connectDB = (MONGODB_URI) => {
  console.log('🔍 MONGODB_URI before connection:', MONGODB_URI);
  // if (!MONGODB_URI || !MONGODB_URI.startsWith('mongodb')) {
  //   console.error('❌ Invalid MONGODB_URI:', MONGODB_URI);
  //   process.exit(1);
  // }
  // // Set up event listeners first
  // mongoose.connection.on('connected', () => {
  //   console.log('✅ MongoDB connected successfully!');
  // });
  
  // mongoose.connection.on('error', (err) => {
  //   console.error('❌ MongoDB connection error:', err);
  // });

  // Connect using MONGODB_URI
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(err => {
    console.error('❌ Initial MongoDB connection failed:', err);
    throw err;
  }); 
};

module.exports = connectDB
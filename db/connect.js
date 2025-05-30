const mongoose = require('mongoose')

// const connectDB = (MONGODB_URI) => {
// return mongoose.connect(url, {
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//     useUnifiedTopology: true,
// })
//    }
//// secrets fixes
const connectDB = (MONGODB_URI) => {
  // Set up event listeners first
  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connected successfully!');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  // Return the connection promise
  return mongoose.connect(MONGODB_URI)
    .catch(err => {
      console.error('❌ Initial MongoDB connection failed:', err);
      throw err; // Re-throw if you want calling code to handle it
    });
};

module.exports = connectDB
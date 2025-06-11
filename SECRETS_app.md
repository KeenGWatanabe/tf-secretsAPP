const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
console.log('🔍 Loaded ENV:', process.env.MONGODB_URI);
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



const port = process.env.PORT || 5000;
console.log('🔍 Starting server...');

const start = async () => {
  try {
    await connectDB();// No need to pass URI manually since Secrets Manager will provide it
    console.log('✅ Database connection established');
    // middleware
    app.use(express.static('./public'));
    app.use(express.json());

    // routes
    app.use('/api/v1/tasks', tasks)
    app.use(notFound);
    app.use(errorHandlerMiddleware)

    app.listen(port, () => {
      console.log(`🚀Server is listening on port ${port}...`)
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};
start();
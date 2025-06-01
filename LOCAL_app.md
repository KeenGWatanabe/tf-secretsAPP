const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
console.log('🔍 Loaded ENV:', process.env.MONGODB_URI);
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware

app.use(express.static('./public'));
app.use(express.json());

// routes

app.use('/api/v1/tasks', tasks)

app.use(notFound);
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/taskmgr";

console.log('🔍 MONGODB_URI before connection:', MONGODB_URI);

const start = async () => {
  try {
    await connectDB(MONGODB_URI);
    console.log('✅ Database connection established');
    app.listen(port, () =>
      console.log(`🚀Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};
start();
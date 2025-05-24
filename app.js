const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
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

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/taskmgr");
//     app.listen(port, () =>
//       console.log(`Server is listening on port ${port}...`)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

const start = async () => {
  try {
    // Enhanced connection logic
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI && process.env.NODE_ENV === 'production') {
      throw new Error('MongoDB URI not configured - set MONGO_URI environment variable');
    }

    await connectDB(mongoURI);
    
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
      console.log(`Connected to MongoDB at: ${mongoURI ? 'AWS Secret' : 'localhost'}`);
    });
  } catch (error) {
    console.error('Fatal startup error:', error);
    process.exit(1); // Mandatory for ECS to restart failed containers
  }
};

start();
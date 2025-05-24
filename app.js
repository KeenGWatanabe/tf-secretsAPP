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
    // Enhanced environment handling
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('MongoDB URI not configured - Required in production');
      }
      console.warn('Using development MongoDB at localhost:27017');
    }

    await connectDB(mongoURI || "mongodb://localhost:27017/taskmgr");
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log(`MongoDB: ${mongoURI ? 'AWS Secrets Manager' : 'Local fallback'}`);
    });
  } catch (error) {
    console.error('Fatal startup error:', error.message);
    process.exit(1);
  }
};


start();
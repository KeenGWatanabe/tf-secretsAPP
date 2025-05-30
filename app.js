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
// const port = process.env.PORT || 5000;

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
// start();

const MONGODB_URI = process.env.MONGODB_URI;

connectDB(MONGODB_URI)
  .then(() => {
    console.log('Database connection established');
    // Start your server here
  })
  .catch(err => {
    console.error('Database connection failed', err);
    process.exit(1);
  });

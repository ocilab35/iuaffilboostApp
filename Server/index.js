import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './Routes/authRoute.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(cors({ origin: 'http://localhost:8081' })); // Adjust frontend URL
app.use(express.json());

// MongoDB connection
const PORT = process.env.PORT || 5000;
const URI = process.env.MongoDBURI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error: ', error));

// Routes
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

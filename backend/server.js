import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import http from 'http';
import { connectDB } from './config/db.js';


const app = express();
const PORT = 5001;

//DB
connectDB();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API WORKING");
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
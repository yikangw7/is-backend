const http = require('http');
const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(db);
const corsOptions = {
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204, // No Content
};

app.use(cors(corsOptions));


const hostname = '127.0.0.1';
const port = 3000;
 
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Sample Endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'TEST ENDPOINT RESPONSE' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

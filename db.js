const express = require('express');
const cors = require('cors');
const router = express.Router();

const mysql = require('mysql2/promise');

// Parsing POST req data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204, // No Content
};

router.use(cors(corsOptions));

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'yikang',
  password: 'pswd1337',
  database: 'isdb',
});

// Query Users
router.get('/api/getUsers', async (req, res) => {
  const connection = await pool.getConnection();
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

  try {
    const [results, fields] = await connection.query('SELECT * FROM users');
    console.log(results);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.json(error);
  } finally {
    connection.release();
  }
});

// Create New User
router.post('/api/createUser', async (req, res) => {
  const connection = await pool.getConnection();
  const { username, email, password } = req.body;

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

  try {
    // Insert a new user into the 'users' table
    const [results, fields] = await connection.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    res.json(results);
    console.log(results);
  } catch (error) {
    console.error(error);
    res.json(error);
  } finally {
    connection.release();
  }
});

// Delete User
router.delete('/api/deleteUserByID', async (req, res) => {
  const connection = await pool.getConnection();
  const { userId } = req.body;

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

  try {
    // Delete a user by ID
    const [results, fields] = await connection.query('DELETE FROM users WHERE id = ?', [userId]);
    res.json(results);
    console.log(results);
  } catch (error) {
    console.error(error);
    res.json(error);
  } finally {
    connection.release();
  }
});

// Delete User
router.delete('/api/deleteUser', async (req, res) => {
  const connection = await pool.getConnection();
  const { username } = req.body;

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

  try {
    // Delete a user by ID
    const [results, fields] = await connection.query('DELETE FROM users WHERE username = ?', [username]);
    res.json(results);
    console.log(results);
  } catch (error) {
    console.error(error);
    res.json(error);
  } finally {
    connection.release();
  }
});

module.exports = router;

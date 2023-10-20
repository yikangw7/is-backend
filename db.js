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

// Google User Operations
// Create New Google User
router.post('/api/createGoogleUser', async (req, res) => {
  const connection = await pool.getConnection();
  const { email } = req.body;

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

  try {
    // Insert a new user into the 'google_users' table
    const [results, fields] = await connection.query('INSERT INTO google_users (email) VALUES (?)', [email]);
    res.json(results);
    console.log(results);
  } catch (error) {
    console.error(error);
    res.json(error);
  } finally {
    connection.release();
  }
});
// Query if User Exists
router.post('/api/googleUserExists', async (req, res) => {
  const connection = await pool.getConnection();
  const { email } = req.body;

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

  try {
    // Checks if email exists
    const [results, fields] = await connection.execute('SELECT * FROM google_users WHERE email = ?', [email]);
    // Check if any rows were returned (user exists)
    if (results.length > 0) {
      // User with the email exists
      res.json({ exists: true });
    } else {
      // User with the email does not exist
      res.json({ exists: false });
    }
    console.log(results);
  } catch (error) {
    console.error(error);
    res.json(error);
  } finally {
    connection.release();
  }
});

// Add User Favourite Player
router.post('/api/addFavourite', async (req, res) => {
  const connection = await pool.getConnection();
  const { id, email } = req.body;

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

  try {
    // Insert a new user into the 'google_users' table
    const [results, fields] = await connection.query('INSERT INTO favourite_players (id, email) VALUES (?, ?)', [id, email]);
    res.json(results);
    console.log(results);
  } catch (error) {
    console.error(error);
    res.json(error);
  } finally {
    connection.release();
  }
});

// Delete User's Favourite
router.delete('/api/deleteFavourite', async (req, res) => {
  const connection = await pool.getConnection();
  const { id, email } = req.body;

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

  try {
    // Delete a user's favourite by ID
    const [results, fields] = await connection.query('DELETE FROM favourite_players WHERE id = ? AND email = ?', [id, email]);
    res.json(results);
    console.log(results);
  } catch (error) {
    console.error(error);
    res.json(error);
  } finally {
    connection.release();
  }
});

// Find User's Favourite Players
router.get('/api/getAllFavourites', async (req, res) => {
  const connection = await pool.getConnection();
  const email = req.query.email;

  console.log(req);
  console.log(email);

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

  try {
    // Find user's favourites
    const [results, fields] = await connection.execute('SELECT * FROM favourite_players WHERE email = ?', [email]);
    res.json(results);
    console.log(results);
  } catch (error) {
    console.error(error);
    res.json(error);
  } finally {
    connection.release();
  }
});

// Query if is Favourite 
router.get('/api/isFavourite', async (req, res) => {
  const connection = await pool.getConnection();
  const id = req.query.id;
  const email = req.query.email;

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
    } else {
      console.log('Connected to the database');
    }
  });

  try {
    // Checks if email exists
    const [results, fields] = await connection.execute('SELECT * FROM favourite_players WHERE email = ? AND id = ?', [email, id]);
    // Check if any rows were returned (user exists)
    if (results.length > 0) {
      // User with the email exists
      res.json({ exists: true });
    } else {
      // User with the email does not exist
      res.json({ exists: false });
    }
    console.log(results);
  } catch (error) {
    console.error(error);
    res.json(error);
  } finally {
    connection.release();
  }
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

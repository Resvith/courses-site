const { Pool } = require('pg');
const bcrypt = require('bcrypt');


// Utwórz pulę połączeń
const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: 'admin',
  database: 'CoursesSite',
});

async function loginUser(username, password) {
  const query = 'SELECT * FROM users WHERE username = $1 OR email = $1';
  const params = [username];

  try {
    // Pobierz połączenie z puli
    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release(); // Zwróć połączenie do puli
    
    if (result.rows.length > 0) {
      const passwordDb = result.rows[0].password;
      const isPasswordCorrect = await bcrypt.compare(password, passwordDb);
      return isPasswordCorrect;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Error fetching user:', err); 
    throw err;
  }
}

async function isUsernameAvailable(username) {
  const query = 'SELECT * FROM users WHERE username = $1';
  const params = [username];

  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();
    if (result.rows.length > 0) {
      return false;
    } else {
      return true;
      } 
      } catch (err) {
        console.error('Error fetching user:', err);
        throw err;
      }
}

async function isEmailAvailable(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const params = [email];

  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();
    if (result.rows.length > 0) {
      return false;
    } else {
      return true;
      } 
      } catch (err) {
        console.error('Error fetching user:', err);
        throw err;
      }
}

async function createUser(username, email, password) {
  const insertQuery = 'INSERT INTO users (username, email, password, user_type) VALUES ($1, $2, $3, $4)';  
  try {
    // Connect to the database
    const client = await pool.connect();
    
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    userType = 'user';
    const insertParams = [username, email, hashedPassword, userType];
    
    await client.query(insertQuery, insertParams);
    client.release();
    return true;

  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
}

async function checkSession(token) {
  const query = 'SELECT * FROM sessions WHERE sid = $1';
  const params = [token];
  // console.log("Token in database: ", token);

  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();
    if (result.rows.length > 0) {
      return true;
    } else {
      return false;
    } 
      } catch (err) {
        console.error('Error fetching token:', err);
        throw err;
      }
}

async function deleteSession(token) {
  const query = 'DELETE FROM sessions WHERE sid = $1';
  const params = [token];
  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();

    if (result.rowCount > 0) {
      return true; // Indicating that something was deleted
    } else {
      return false; // Indicating that no row was deleted
    }
  } catch (err) {
    console.error('Error deleting token:', err);
    throw err;
  }
}

module.exports = {
  pool,
  loginUser,
  isUsernameAvailable,
  isEmailAvailable,
  createUser,
  checkSession,
  deleteSession,
};
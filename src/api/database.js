const { Pool } = require('pg');

// Utwórz pulę połączeń
const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: 'admin',
  database: 'CoursesSite',
});

async function loginUser(username, password) {
  const query = 'SELECT * FROM users WHERE (username = $1 OR email = $1) AND password = $2';
  const params = [username, password];

  try {
    // Pobierz połączenie z puli
    const client = await pool.connect();
    
    const result = await client.query(query, params);
    client.release(); // Zwróć połączenie do puli
    if (result.rows.length > 0) {
      return true;
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

module.exports = {
  loginUser,
  isUsernameAvailable,
  isEmailAvailable,
};
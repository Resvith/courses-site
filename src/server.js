const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const jwt = require('jsonwebtoken');
const pgPool = require('./api/database.js').pool;
const bcrypt = require('bcrypt');

const port = 3000;
const cookieExpires = 30 * 24 * 60 * 60 * 1000; // 30 days
const app = express();

const { loginUser, isUsernameAvailable, isEmailAvailable, createUser, checkSession, deleteSession } = require('./api/database.js');

app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PUT', 'HEAD', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new pgSession({
      pool: pgPool,                // Connection pool
      tableName: 'sessions'        // Use another table-name than the default "session" one
  }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: cookieExpires } // 30 days
}));

async function getCreatorIdFromToken(token) {
  console.log('Getting creator ID for token:', token);
  const username = await getUsernameFromToken(token);
  console.log('Username from token:', username);
  if (!username) return null;

  let client;
  try {
    client = await pgPool.connect();
    const userQuery = 'SELECT user_id FROM users WHERE username = $1';
    const userResult = await client.query(userQuery, [username]);
    if (userResult.rows.length === 0) {
      console.log('User not found');
      return null;
    }
    const user_id = await userResult.rows[0].user_id;
    console.log("user id", user_id);

    const creatorQuery = 'SELECT creator_id FROM creator_info WHERE user_id = $1';
    const creatorResult = await client.query(creatorQuery, [user_id]);
    client.release();
    if (creatorResult.rows.length === 0) {
      console.log('Creator not found');
      return null;
    }
    return creatorResult.rows[0].creator_id;

  } catch (error) {
    console.error('Error in getCreatorIdFromToken:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
    return null;
  }
};


async function getUserIdFromUsername(username) {
  const client = await pgPool.connect();
  const result = await client.query('SELECT user_id FROM users WHERE username=$1', [username]);
  client.release();
  if (result.rowCount > 0) {
    const user_id = result.rows[0].user_id;
    // console.log("User id from getUserIdFromUsername: ", user_id)
    return user_id;
  }
  return null;
};


async function getUsernameFromToken(token) {
  const client = await pgPool.connect();
  const result = await client.query('SELECT * FROM sessions WHERE sid=$1', [token]);
  client.release();
  if (result.rowCount > 0) {
    const sess = result.rows[0].sess;
    return sess.userId;
  }
  return null;
};

async function getUserTypeFromUserId(userId) {
  const client = await pgPool.connect();
  const result = await client.query('SELECT user_type FROM users WHERE user_id=$1', [userId]);
  client.release();
  if (result.rowCount > 0) {
    return result.rows[0].user_type;
  }
  return null;
};

async function getCourseCreatorId(courseId) {
  const client = await pgPool.connect();
  const result = await client.query('SELECT creator_id FROM course WHERE course_id=$1', [courseId]);
  client.release();
  if (result.rowCount > 0) {
    return result.rows[0].creator_id;
  }
  return null;
};

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/api/check-username/:username' , async (req, res) => {
    const username = req.params.username;
    const isAvailable = await isUsernameAvailable(username);
    res.send(isAvailable);
});

app.get('/api/check-email/:email' , async (req, res) => {
  const email = req.params.email;
  const isAvailable = await isEmailAvailable(email);
  res.send(isAvailable);
});
  
app.post('/api/register', async (req, res) => {
    const userData = req.body;
    const username = userData.username;
    const email = userData.email;
    const password = userData.password;
    // console.log("Password:", password);
    createUser(username, email, password);
    res.send(true);
  });

  app.get(`/api/check-session/:token`, async (req, res) => {
    const token = req.params.token;
    // console.log("Token on server: ", token);
    const isTokenFound = await checkSession(token);
    // console.log("isTokenFound: ", isTokenFound)
    res.send({ success: isTokenFound });
});

app.post('/api/login', async (req, res) => {
  const userData = req.body;
  try {
    const client = await pgPool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1', [userData.username]);
    client.release();

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isLoggedOn = await bcrypt.compare(userData.password, user.password);
      if (isLoggedOn) {
        req.session.userId = user.username;
        req.session.userType = user.user_type; // Add this line
        req.session.save((err) => {
          if (err) {
            console.error(err);
            res.status(500).send({ success: false, message: 'Session save failed' });
          } else {
            const token = jwt.sign({ userId: user.username }, 'SECRET', { expiresIn: '1h' });
            res.send({ 
              success: true, 
              token: req.sessionID,
              userType: user.user_type // Include user type in response
            });
          }
        });
      } else {
        res.send({ success: false, message: 'Invalid username or password' });
      }
    } else {
      res.send({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ success: false, message: 'Internal server error' });
  }
});

app.delete('/api/logout/:token', async (req, res) => {
  token = req.params.token;
  // console.log("Token in server on logout: ", token);
  const isDeleted = await deleteSession(token);
  if (isDeleted) {
    res.send({ success: true });
    // console.log("Database delete token: ", token);
  }
  else {
    res.send({ success: false });
    // console.log("Database delete token failed: ", token);
  }
});

app.get('/api/courses', async (req, res) => {
  try {
      const status = 'active';
      const client = await pgPool.connect();
      const result = await client.query('SELECT course_id, creator_id, title, description, price, img FROM course WHERE status = $1', [status]);
      client.release();
      res.send(result.rows);
  } catch (err) {
      console.error('Error fetching courses:', err);
      res.status(500).send({ success: false, message: 'Error fetching courses' });
  }
});

app.get('/api/course/:id', async (req, res) => {
  const courseId = req.params.id;
  // console.log("Server course id: ", courseId);
  const client = await pgPool.connect();
  const result = await client.query('SELECT course_id, creator_id, title, description, price, img FROM course WHERE course_id = $1', [courseId]);
  client.release();
  if (result.rowCount > 0) {
    res.json(result.rows[0]);
    // console.log("Server res json: ", result.rows[0]);
  } else {
    res.status(404).send({ message: 'Course not found' });
  }
});

app.get('/api/modules/:courseId', async (req, res) => {
  const courseId = req.params.courseId;
  try {
      const client = await pgPool.connect();
      const result = await client.query('SELECT * FROM modules WHERE course_id = $1', [courseId]);
      client.release();
      if (result.rowCount > 0) {
          res.json(result.rows);
      } else {
          res.status(404).send({ message: 'Modules not found for this course' });
      }
  } catch (err) {
      console.error('Error fetching modules:', err);
      res.status(500).send({ success: false, message: 'Error fetching modules' });
  }
});

app.get('/api/lessons/:moduleId', async (req, res) => {
  const moduleId = req.params.moduleId;
  // console.log("In lessons module id: ", moduleId);
  try {
      const client = await pgPool.connect();
      const result = await client.query('SELECT module_id, lesson_id, name, video_url, text_description FROM lesson WHERE module_id = $1', [moduleId]);
      client.release();
      if (result.rowCount > 0) {
          res.json(result.rows);
      } else {
          res.status(404).send({ message: 'Lessons not found for this module' });
      }
  } catch (err) {
      console.error('Error fetching lessons:', err);
      res.status(500).send({ success: false, message: 'Error fetching lessons' });
  }
});

app.get('/api/user-by-token/:token', async (req, res) => {
  const token = req.params.token;
  const client = await pgPool.connect();
  const result = await client.query('SELECT sid, sess FROM sessions WHERE sid=$1', [token]);
  client.release();
  if (result.rowCount > 0) {
    // console.log("User by token: ", result.rows[0].sess.userId);
    res.json(result.rows[0].sess.userId);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.get('/api/courses/:username', async (req, res) => { 
  const username = req.params.username;
  const status = 'active';
  try {
      const client = await pgPool.connect();
      const result = await client.query('SELECT c.course_id, c.title, c.description, c.img FROM course c JOIN having_courses hc ON c.course_id = hc.course_id JOIN users u ON hc.user_id = u.user_id WHERE u.username = $1 AND c.status = $2; ', [username, status]);
      client.release();
      console.log(result.rows);
      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching courses:', err);
      res.status(500).send({ success: false, message: 'Error fetching courses' });
  }
});

app.get('/api/is-course-bought/:token/:courseId', async (req, res) => {
  const token = req.params.token;
  const courseId = req.params.courseId;
  try {
    const client = await pgPool.connect();
    const username = await getUsernameFromToken(token);
    if (!username) {
      return res.status(401).send({ success: false, message: 'Invalid token' });
    }
    // console.log("Is bought auth, username: ", username);
    const userQueryResult = await client.query(
      'SELECT user_id FROM users WHERE username = $1',
      [username]);
   
    if (userQueryResult.rowCount === 0) {
      throw new Error('User not found');
    }
    const userId = userQueryResult.rows[0].user_id;
    const result = await client.query(
      'SELECT * FROM having_courses WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );
    client.release();
    if (result.rowCount > 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (err) {
    console.error('Error checking if course is bought:', err);
    res.status(500).send({ success: false, message: 'Error checking if course is bought' });
  }
});

app.get('/api/cart/:token', async (req, res) => {
  username = await getUsernameFromToken(req.params.token);
  user_id = await getUserIdFromUsername(username);

  try {
    const client = await pgPool.connect();
    const result = await pgPool.query('SELECT c.course_id, c.title, c.description, c.img, c.price FROM course c JOIN cart ca ON c.course_id = ca.course_id JOIN users u ON ca.user_id = u.user_id WHERE u.user_id = $1; ', [user_id]);
    client.release();
    // console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).send({ success: false, message: 'Error fetching courses' });
  }
}); 

app.get('/api/cart/:token/:courseId', async (req, res) => {
  try {
    const username = await getUsernameFromToken(req.params.token);
    const user_id = await getUserIdFromUsername(username);
    const course_id = req.params.courseId;

    const client = await pgPool.connect();
    const result = await client.query(
      'SELECT c.course_id, c.title, c.description, c.img, c.price FROM course c JOIN cart ca ON c.course_id = ca.course_id JOIN users u ON ca.user_id = u.user_id WHERE u.user_id = $1 AND c.course_id = $2',
      [user_id, course_id]
    );
    client.release();

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, data: result.rows[0] });
    } else {
      res.status(200).json({ success: false, message: 'Course not in cart' });
    }
  } catch (err) {
    console.error('Error checking if course is in cart:', err);
    res.status(500).json({ success: false, message: 'Error checking if course is in cart' });
  }
});

app.delete('/api/cart/:token/:courseId', async (req, res) => {
  username = await getUsernameFromToken(req.params.token);
  user_id = await getUserIdFromUsername(username);
  course_id = req.params.courseId;

  try {
    const client = await pgPool.connect();
    const result = await pgPool.query('DELETE FROM cart WHERE user_id = $1 AND course_id = $2; ', [user_id, course_id]);
    client.release();
    res.status(200).send({ success: true });
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).send({ success: false, message: 'Error fetching courses' });
  }
});

app.post('/api/cart/:token/:courseId', async (req, res) => {
  const token = req.params.token;
  const courseId = req.params.courseId;
  
  try {
    const username = await getUsernameFromToken(token);
    const userId = await getUserIdFromUsername(username);
    
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    
    const client = await pgPool.connect();
    await client.query('INSERT INTO cart (user_id, course_id) VALUES ($1, $2)', [userId, courseId]);
    client.release();
    
    res.status(200).send({ success: true });
  } catch (err) {
    console.error('Error adding course to cart:', err);
    res.status(500).json({ success: false, message: 'Error adding course to cart' });
  }
});

app.post('/api/process-payment', async (req, res) => {
  const { token, amount } = req.body;
  
  try {
    const client = await pgPool.connect();
    const sessionResult = await client.query('SELECT sess FROM sessions WHERE sid = $1', [token]);
    if (sessionResult.rows.length === 0) {
      throw new Error('Invalid session');
    }
    const username = sessionResult.rows[0].sess.userId;
    
    const userResult = await client.query('SELECT user_id FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }
    const userId = userResult.rows[0].user_id;
    
    const cartResult = await client.query('SELECT course_id FROM cart WHERE user_id = $1', [userId]);
    const courseIds = cartResult.rows.map(row => row.course_id);
    
    await client.query('BEGIN');
    
    for (const courseId of courseIds) {
      await client.query('INSERT INTO having_courses (user_id, course_id) VALUES ($1, $2)', [userId, courseId]);
      await client.query('DELETE FROM cart WHERE user_id = $1 AND course_id = $2', [userId, courseId]);
    }
    
    await client.query('COMMIT');
    
    client.release();
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ success: false, message: 'Error processing payment' });
  }
});

app.get('/api/user-profile/:token', async (req, res) => {
  const token = req.params.token;
  try {
    const username = await getUsernameFromToken(token);
    const client = await pgPool.connect();
    const result = await client.query('SELECT username, user_type, email FROM users WHERE username = $1', [username]);
    client.release();
    if (result.rowCount > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).send({ success: false, message: 'Error fetching user profile' });
  }
});

app.post('/api/change-password', async (req, res) => {
  const { token, currentPassword, newPassword } = req.body;
  try {
    const username = await getUsernameFromToken(token);
    const client = await pgPool.connect();
    const userResult = await client.query('SELECT password FROM users WHERE username = $1', [username]);
    if (userResult.rowCount === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    const isPasswordCorrect = await bcrypt.compare(currentPassword, userResult.rows[0].password);
    if (!isPasswordCorrect) {
      return res.status(400).send({ message: 'Current password is incorrect' });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await client.query('UPDATE users SET password = $1 WHERE username = $2', [hashedNewPassword, username]);
    client.release();
    res.send({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).send({ success: false, message: 'Error changing password' });
  }
});

app.delete('/api/delete-account/:token', async (req, res) => {
  const token = req.params.token;
  try {
    const username = await getUsernameFromToken(token);
    const client = await pgPool.connect();
    await client.query('DELETE FROM users WHERE username = $1', [username]);
    await client.query('DELETE FROM sessions WHERE sid = $1', [token]);
    client.release();
    res.send({ success: true, message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).send({ success: false, message: 'Error deleting account' });
  }
});

app.get('/api/user-type/:token', async (req, res) => {
  const token = req.params.token;
  try {
    const username = await getUsernameFromToken(token);
    const client = await pgPool.connect();
    const result = await client.query('SELECT user_type FROM users WHERE username = $1', [username]);
    client.release();
    if (result.rowCount > 0) {
      res.json({ userType: result.rows[0].user_type });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (err) {
    console.error('Error fetching user type:', err);
    res.status(500).send({ success: false, message: 'Error fetching user type' });
  }
});

app.post('/api/become-creator', async (req, res) => {
  const { token, ...creatorData } = req.body;
  try {
    const username = await getUsernameFromToken(token);
    if (!username) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    const client = await pgPool.connect();
    
    try {
      await client.query('BEGIN');

      // Get user_id from username
      const userResult = await client.query('SELECT user_id FROM users WHERE username = $1', [username]);
      if (userResult.rows.length === 0) {
        throw new Error('User not found');
      }
      const userId = userResult.rows[0].user_id;

      // Update user type to 'creator'
      await client.query('UPDATE users SET user_type = $1 WHERE user_id = $2', ['creator', userId]);
    
      // Insert creator-specific data into creator_info table
      await client.query('INSERT INTO creator_info (user_id, bank_account, name, surname, birthday, address, city, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
        [userId, creatorData.bankAccount, creatorData.name, creatorData.surname, creatorData.birthday, creatorData.address, creatorData.city, creatorData.postalCode, creatorData.country]);

      await client.query('COMMIT');
      res.json({ success: true });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error upgrading account:', error);
    res.status(500).json({ success: false, message: 'Error upgrading account' });
  }
});

app.get('/api/creator-courses/:token', async (req, res) => {
  console.log('Received request for creator courses');
  const token = req.params.token;
  const status = 'active';
  console.log('Token:', token);

  let client;
  try {
    const creatorId = await getCreatorIdFromToken(token);
    console.log('Creator ID:', creatorId);

    if (!creatorId) {
      console.log('Unauthorized or not a creator');
      return res.status(401).json({ error: 'Unauthorized or not a creator' });
    }

    client = await pgPool.connect();
    const coursesQuery = `
      SELECT course_id, title, description, price, img
      FROM course
      WHERE creator_id = $1 AND status = $2
    `;
    const coursesResult = await client.query(coursesQuery, [creatorId, status]);
    console.log('Courses found:', coursesResult.rows.length);

    res.json(coursesResult.rows);
  } catch (error) {
    console.error('Error fetching creator courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (client) client.release();
  }
});

app.delete('/api/courses/:token/:courseId', async (req, res) => {
  const token = req.params.token;
  const courseId = req.params.courseId;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const username = await getUsernameFromToken(token);
    const userId = await getUserIdFromUsername(username);

    if (!userId) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Check if the user is an admin or the creator of the course
    const userType = await getUserTypeFromUserId(userId);
    if (userType !== 'admin') {
      const creatorId = await getCreatorIdFromToken(token);
      const courseCreatorId = await getCourseCreatorId(courseId);
      if (creatorId !== courseCreatorId) {
        return res.status(403).json({ error: 'Permission denied' });
      }
    }

    // Start transaction
    const client = await pgPool.connect();
    await client.query('BEGIN');

    try {
      // Delete redundant data from other tables
      //await client.query('DELETE FROM modules WHERE course_id = $1', [courseId]);

      // Setting course status to 'deleted' instead of actually deleting it
      await client.query('UPDATE course SET status = $1 WHERE course_id = $2', ['deleted', courseId]);

      await client.query('COMMIT');

      res.json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.get('/api/creator-id/:token', async (req, res) => {
  const token = req.params.token;
  const creatorId = await getCreatorIdFromToken(token);
  if (!creatorId) {
    return res.status(401).send({ success: false, error: 'Unauthorized' });
  }
  return res.status(200).send({ success: true, creatorId });
});
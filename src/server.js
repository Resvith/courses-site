const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const jwt = require('jsonwebtoken');
const pgPool = require('./api/database.js').pool;
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
  const isLoggedOn = await loginUser(userData.username, userData.password);
  if (isLoggedOn) {
    req.session.userId = userData.username; // Assuming username is unique
    req.session.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ success: false, message: 'Session save failed' });
      } else {
        const token = jwt.sign({ userId: userData.username }, 'SECRET', { expiresIn: '1h' }); // Adjust expiration as needed
        // console.log('Session saved: ', req.sessionID);
        res.send({ success: true, token: req.sessionID });
      }
    });
  } else {
    res.send({ success: false, message: 'Invalid username or password' });
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
      const client = await pgPool.connect();
      const result = await client.query('SELECT course_id, creator_id, title, description, price, img FROM course');
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
  try {
      const client = await pgPool.connect();
      const result = await client.query('SELECT c.course_id, c.title, c.description, c.img FROM course c JOIN having_courses hc ON c.course_id = hc.course_id JOIN users u ON hc.user_id = u.user_id WHERE u.username = $1; ', [username]);
      client.release();
      console.log(result.rows);
      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching courses:', err);
      res.status(500).send({ success: false, message: 'Error fetching courses' });
  }
});

async function getUserIdFromToken(token) {
  const client = await pgPool.connect();
  const result = await client.query('SELECT * FROM sessions WHERE sid=$1', [token]);
  client.release();
  if (result.rowCount > 0) {
    const sess = result.rows[0].sess;
    return sess.userId;
  }
  return null;
}

app.get('/api/is-course-bought/:token/:courseId', async (req, res) => {
  const token = req.params.token;
  const courseId = req.params.courseId;
  try {
    const client = await pgPool.connect();
    const username = await getUserIdFromToken(token);
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
}

app.get('/api/cart/:token', async (req, res) => {
  username = await getUserIdFromToken(req.params.token);
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
    const username = await getUserIdFromToken(req.params.token);
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
  username = await getUserIdFromToken(req.params.token);
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
    const username = await getUserIdFromToken(token);
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
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
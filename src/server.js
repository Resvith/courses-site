const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pgPool = require('./api/database.js').pool;
const port = 3000;
const cookieExpires = 30 * 24 * 60 * 60 * 1000; // 30 days
const app = express();

const { loginUser, isUsernameAvailable, isEmailAvailable, createUser, checkSession } = require('./api/database.js');

app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
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
    console.log("Password:", password);
    createUser(username, email, password);
    res.send(true);
  });

  app.get(`/api/check-session/:token`, async (req, res) => {
    const token = req.params.token;
    console.log("Token on server: ", token);
    const isTokenFound = await checkSession(token);
    console.log("isTokenFound: ", isTokenFound)
    res.send({ success: isTokenFound });
});

app.post('/api/login', async (req, res) => {
  const userData = req.body;
  const isLoggedOn = await loginUser(userData.username, userData.password);
  if (isLoggedOn) {
    req.session.userId = userData.username; // Assuming username is unique
    console.log("Session into login: ", req.session);
    req.session.save((err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ success: false, message: 'Session save failed' });
      } else {
        console.log('Session saved: ', req.sessionID);
        res.send({ success: true, token: req.sessionID });
      }
    });
  } else {
    res.send({ success: false, message: 'Invalid username or password' });
  }
});
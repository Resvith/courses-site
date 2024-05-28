const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const port = 3000;
const app = express();

const { loginUser } = require('./api/database.js');

app.use(cors({
  origin: 'http://localhost:8080', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hello from Node.js!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.post('/api/login', async (req, res) => {
    const userData = req.body;
    
    // return true if user is logged in, false otherwise
    const isLoggedOn = await loginUser(userData.userName, userData.userPass);

    console.log("Is Logged On:", isLoggedOn);
    res.send(isLoggedOn);
  });
  

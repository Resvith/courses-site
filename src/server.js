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
});app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.post('/api/users', async (req, res) => {
    const userData = req.body;
    
    const user = await loginUser(userData.userName, userData.userPass);

    console.log("Node:", user);
    res.send(user);
  });
  

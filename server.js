const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ================================================================== */

// Fetch genkey
const keyMongodb = 'mongodb+srv://benzmasters:WLOJ3L4t63MTu3mN@cluster0-pj6ax.mongodb.net/main?retryWrites=true';
var connectMongodb = process.env.MONGODB_URI || keyMongodb;

// Connect MongoDB
mongoose.connect(connectMongodb, {
    useNewUrlParser: true 
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

/* ================================================================== */

app.get('/', (req, res) => res.send('Hello World'));

// Config to API
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Config Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

/* ================================================================== */

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
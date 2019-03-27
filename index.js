const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('hello world')
})

// Config API
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Config Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Fetch genkey
const keyMongodb = 'mongodb+srv://benzmasters:2tH4i1Pyq2qCOrId@cluster0-pj6ax.mongodb.net/test?retryWrites=true'; 

var connectMongodb = process.env.MONGODB_URI || keyMongodb;

// Connect MongoDB
mongoose.connect(connectMongodb, {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport.js')(passport);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

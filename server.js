const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
// user cors 
app.use(cors());

// body parser
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use( bodyParser.json());

// DB config 
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
    .connect(db)
    .then( ()=> {
        console.log("MOngodb connected");
    })
    .catch((err) => {
        console.log(err);
    });

// passport middleware 
app.use(passport.initialize());

// passport config
require('./config/passport.js')(passport);


//user routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.port || 5000;

app.listen(port, ()=> {
    console.log(` Server running on port ${port} `);
});
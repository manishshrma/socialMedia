const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const {secretOrKey}=require("./config/keys");
console.log(secretOrKey);
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
const session=require("express-session");
const MongoStore = require('connect-mongo')(session);
app.use(express.json());

// Body parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB


mongoose.connect(db,{ useUnifiedTopology: true })
const connection=mongoose.connection;

connection.once("open",()=>{
    console.log("MongoDB database connection established successfully");

})

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);
/////////////////////////////maintain session using cookies////////////////
const sessionstore=new MongoStore({
  mongooseConnection:connection,
  collection:'grootedb'
})

app.use(session({
secret:secretOrKey,
resave:false,
cookie:{maxAge:1000*60*60*24},
store:sessionstore

}))
//////////////////////////////end//////////////////////////////////////////





// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

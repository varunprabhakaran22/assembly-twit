const express = require('express');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const session = require('express-session');
// const connectDB = require('./config/db');
const cors=require('cors');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());

// Connect to database
// connectDB();

app.use(express.json());

passport.use(new Strategy({
    consumerKey: 'yUT02IJbXkmh4pzh2uZcw1jX8',
    consumerSecret: '6ddvXruhDlmxLTu6UipunJaPCaQqe4RdRn4GAcJw6nE7IH6nhR',
    callbackURL: 'https://assembly-twit.herokuapp.com/loginPage'
}, function(token, tokenSecret, profile, callback) {
    console.log(token);
    console.log(tokenSecret);
    console.log(profile);
    return callback(null, profile);
}));

passport.serializeUser(function(user, callback) {
    callback(null, user);
})

passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
})

app.use(session({secret: 'whatever', resave: true, saveUninitialized: true}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/api/twitter/login', passport.authenticate('twitter'))


app.get('/loginPage', passport.authenticate('twitter', {
  failureRedirect:'/'
}),(req, res) =>{
    console.log(res)
})

// Define Routes
// app.use('/', require('./routes/index'));
// app.use('/api/auth', require('./routes/login'));
// app.use('/api/url', require('./routes/url')); 



app.listen(port, () => {
  console.log('Server is ready on port :' + port);
});
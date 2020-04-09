const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const port = 4000;
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const session = require("express-session");
const authRoutes = require("./routes/auth-routes");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // parse cookie header

// connect to mongodb
mongoose.connect(keys.MONGODB_URI, () => {
  console.log("connected to mongo db");
});

app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
);

// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// set up routes
app.use("/auth", authRoutes);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});

// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));































// const express = require('express');
// const passport = require('passport');
// const Strategy = require('passport-twitter').Strategy;
// const session = require('express-session');
// // const connectDB = require('./config/db');
// const cors=require('cors');

// const app = express();

// const port = process.env.PORT || 5000;

// app.use(cors());

// // Connect to database
// // connectDB();

// app.use(express.json());
// app.use(require('body-parser').urlencoded({ extended: true }));

// passport.use(new Strategy({
//     consumerKey: 'yUT02IJbXkmh4pzh2uZcw1jX8',
//     consumerSecret: '6ddvXruhDlmxLTu6UipunJaPCaQqe4RdRn4GAcJw6nE7IH6nhR',
//     callbackURL: 'https://assembly-twit.herokuapp.com/loginPage'
// }, async function(token, tokenSecret, profile, callback) {
//     console.log(token);
//     console.log(tokenSecret);
//     console.log(profile);
//     return callback(null, profile);
// }));

// passport.serializeUser(function(user, callback) {
//     callback(null, user);
// })

// passport.deserializeUser(function(obj, callback) {
//     callback(null, obj);
// })

// app.use(session({secret: 'whatever', resave: true, saveUninitialized: true}))

// app.use(passport.initialize())
// app.use(passport.session())

// app.get('/api/twitter/login', passport.authenticate('twitter'))


// app.get('/loginPage', passport.authenticate('twitter', {
//   failureRedirect:'/loginPage'
// }),(req, res) =>{
//     console.log(res)
// })

// // Define Routes
// // app.use('/', require('./routes/index'));
// // app.use('/api/auth', require('./routes/login'));
// // app.use('/api/url', require('./routes/url')); 

// app.get('/profile',
//   require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     console.log("profile")
//     console.log(res)
//     console.log(profile)
//   });


// app.listen(port, () => {
//   console.log('Server is ready on port :' + port);
// });
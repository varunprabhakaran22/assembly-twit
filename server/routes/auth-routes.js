const router = require("express").Router();
const passport = require("passport");
const keys = require("../config/keys");
const crypto = require('crypto')
const OAuth = require('oauth-1.0a')
const axios = require('axios');
const fetch = require('node-fetch');
var OAuthRequest = require('oauth-request');
var oauth_nonce = require( 'oauth_nonce' );
var $ = require("jquery");
// const CLIENT_HOME_PAGE_URL = "https://assembly-twit.herokuapp.com/";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000"

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});


//Fetch user data
router.get("/user/timeline", (req, res) => {
  console.log("user time line")
  let consumer_key = keys.TWITTER_CONSUMER_KEY;
  let consumer_secret = keys.TWITTER_CONSUMER_SECRET
  let access_token = "831004481206657025-LkhVYmhU4LKx3oZxcSmWC6Y4X2FkicK"
  let access_secret = keys.TWITTER_TOKEN_SECRET


  // oauth_nonce( function( value ) {
  //   // do stuff with it
  //   console.log("oauth_nonce")
  //   console.log( value );
  // });
   
  // // sync
  // var value = ouath_nonce();


//   var twitter = OAuthRequest({
//     consumer: {
//       key: consumer_key,
//       secret: consumer_secret
//     },
//     signature_method: 'HMAC-SHA1',
//     hash_function: function(base_string, key) {
//         return crypto.createHmac('sha1', key).update(base_string).digest('base64');
//     }
// });

// twitter.setToken({
//   key: access_token,
//   secret: access_secret
// });

// //list user timeline
// twitter.get('https://api.twitter.com/1.1/statuses/home_timeline.json?screen_name=priyankaraju02', function(err, res, tweets) {
//     console.log(tweets);
//     console.log(res.body)
// });

  
  
  let oauth_signature_method = ""
  let unixTime = new Date().getTime() / 1000;
  unixTime = unixTime.toFixed()
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://api.twitter.com/1.1/statuses/home_timeline.json?screen_name=priyankaraju02',
    'headers': {
      'Authorization': 'OAuth oauth_consumer_key=\"' + consumer_key + '\" ,oauth_token=\"' + access_token + '\",oauth_signature_method="HMAC-SHA256",oauth_timestamp="1586535580",oauth_nonce="TP0uTkbtlhr",oauth_version="1.0",oauth_signature="rCHK5f3ROOsiUnYf8bfMnQGsAGJV%2FN1CoDFyVhhzzRw%3D',
      'Cookie': 'personalization_id="v1_RHKOjvrq1bo8tZLRPy2oWQ=="; lang=en; guest_id=v1%3A158653225846368808'
    }  
  };

  let user_timeline = {}
  request(options, function (error, response) { 
    if (error) throw new Error(error);
    console.log(response.body);
    // user_timeline  = response.body
    res.json(response.body)
  });
   

  
});


// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});


// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);

module.exports = router;


// let homeTimeUrl = "https://api.twitter.com/1.1/statuses/home_timeline.json"
  // let screenName = "iamvarun2209"
  // let countValue = 2
  // const home_time_api_params = {
  //   params: {
  //     screen_name : screenName,
  //     count : countValue
  //   }, 
  //   headers:{
  //     "oauth_Consumer_key":"yUT02IJbXkmh4pzh2uZcw1jX8",
  //     "oauth_Consumer_Secret":"6ddvXruhDlmxLTu6UipunJaPCaQqe4RdRn4GAcJw6nE7IH6nhR",
  //     "oauth_Access_Token":"4326378313-Hp5kCrlc4LxM0Mjg5EOY2znhz4NGrLrrU1rkI5z",
  //     "oauth_Token_Secret":"LMsFzF2K69RzmcNnO4XSfqCLd8RLvnaRnhDWiz9kLTA1M"
  //   }
  // };
  // axios.get(homeTimeUrl, home_time_api_params)
  //   .then(res => console.log(res))
  //   .catch(e => {
  //     console.log("error")
  //     console.log(e)
  //   })

  // 'headers': {
  //   'Authorization': 'OAuth oauth_consumer_key="yUT02IJbXkmh4pzh2uZcw1jX8",oauth_token="4326378313-Hp5kCrlc4LxM0Mjg5EOY2znhz4NGrLrrU1rkI5z",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1586523214",oauth_nonce="Bi5SENCe9nB",oauth_version="1.0",oauth_signature="PQxnVZZd%2FtxpCU%2FqY3QxqwbAzGs%3D"',
  //   'Cookie': 'personalization_id="v1_e2MTrG3D0m0FtjkbdAmq2w=="; guest_id=v1%3A158645988603495531; lang=en'
  // }
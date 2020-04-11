const router = require("express").Router();
const passport = require("passport");
const keys = require("../config/keys");
const request = require('request');
const crypto = require('crypto')
const OAuth = require('oauth-1.0a')
const axios = require('axios');
const fetch = require('node-fetch');
var OAuthRequest = require('oauth-request');
var oauth_nonce = require( 'oauth_nonce' );
var $ = require("jquery");

const MongoClient = require('mongodb').MongoClient;
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


//Api to get  user details from twitter
router.get("/user/timeline", (req, res) => {
  console.log("user time line")
  let consumer_key = keys.TWITTER_CONSUMER_KEY;
  let consumer_secret = keys.TWITTER_CONSUMER_SECRET
  let access_token = "831004481206657025-LkhVYmhU4LKx3oZxcSmWC6Y4X2FkicK"
  let access_secret = keys.TWITTER_TOKEN_SECRET

  
  let screen_name = "priyankaraju02"
  let oauth_signature_method = ""
  let unixTime = new Date().getTime() / 1000;
  unixTime = unixTime.toFixed()
  
  var options = {
    'method': 'GET',
    'url': 'https://api.twitter.com/1.1/statuses/home_timeline.json?screen_name=priyankaraju02',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'OAuth oauth_consumer_key=\"' + consumer_key + '\" ,oauth_token=\"' + access_token + '\",oauth_signature_method="HMAC-SHA256",oauth_timestamp="1586535580",oauth_nonce="TP0uTkbtlhr",oauth_version="1.0",oauth_signature="rCHK5f3ROOsiUnYf8bfMnQGsAGJV%2FN1CoDFyVhhzzRw%3D',
      'Cookie': 'personalization_id="v1_RHKOjvrq1bo8tZLRPy2oWQ=="; lang=en; guest_id=v1%3A158653225846368808',
    }  
  };

  request(options, function (error, response,body) { 
    if (error) throw new Error(error);
    if(response.statusCode  == "200"){
      let user_timeline =JSON.parse(response.body)
      user_timeline.map(u_name => {
        u_name.screen_name = screen_name
      })

      //code to upload user time  to mongodb
      const uri = keys.MONGODB_URI
      const client = new MongoClient(uri, { useNewUrlParser: true });
      client.connect(err => {
        const collection = client.db("test").collection("user_time_line").insertMany(user_timeline);
        if(err){
          console.log(err)
        }
        client.close();
      });
      // console.log(user_timeline)
      res.json({"data " : response.body, "status" : response.statusCode})
    }
    else{
      res.json({"message ":"internal server error","status":"500"})
    } 
  });
});



router.get("/timeline", async (req, res) => {
  console.log("fetc from db")
  let screenName = "priyankaraju02"
  findOne();
  async function findOne() {
    const url = keys.MONGODB_URI
    let screenName = "priyankaraju02"
    const client = await new MongoClient.connect(url, { useNewUrlParser: true })
      .catch(err => { console.log(err); });
      if (!client) {
        console.log("if part")
        res.json({"status":"500","message":"failed"})
          return;
      }
      try {

          const db = client.db("test");

          let collection = db.collection('user_time_line');

          // let query = { "screen_name ": "priyankaraju02" }

          let responds = await collection.find({"screen_name":"priyankaraju02"}).limit(5).toArray()
          console.log("new fun")
          console.log(responds);
          // return res
          res.json({"data":responds,"message":"success"})

      } catch (err) {

          console.log(err);
          res.json({"status":"500","message":"failed"})
      } finally {
    
          client.close();
      }
  }


});



 
module.exports = router;


//Code to get oauth signature

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





// const router = require("express").Router();
// const passport = require("passport");
// const keys = require("../config/keys");
// const request = require('request');
// const crypto = require('crypto')
// const OAuth = require('oauth-1.0a')
// const axios = require('axios');
// const fetch = require('node-fetch');
// var OAuthRequest = require('oauth-request');
// var oauth_nonce = require( 'oauth_nonce' );
// var $ = require("jquery");

// const MongoClient = require('mongodb').MongoClient;
// // const CLIENT_HOME_PAGE_URL = "https://assembly-twit.herokuapp.com/";
// const CLIENT_HOME_PAGE_URL = "http://localhost:3000"

// // when login is successful, retrieve user info
// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.json({
//       success: true,
//       message: "user has successfully authenticated",
//       user: req.user,
//       cookies: req.cookies
//     });
//   }
// });

// // when login failed, send failed msg
// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "user failed to authenticate."
//   });
// });

// // When logout, redirect to client
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect(CLIENT_HOME_PAGE_URL);
// });

// // auth with twitter
// router.get("/twitter", passport.authenticate("twitter"));

// // redirect to home page after successfully login via twitter
// router.get(
//   "/twitter/redirect",
//   passport.authenticate("twitter", {
//     successRedirect: CLIENT_HOME_PAGE_URL,
//     failureRedirect: "/auth/login/failed"
//   })
// );


// //Api to get  user details from twitter
// router.get("/user/timeline", (req, res) => {
//   console.log("user time line")
//   let consumer_key = keys.TWITTER_CONSUMER_KEY;
//   let consumer_secret = keys.TWITTER_CONSUMER_SECRET
//   let access_token = "831004481206657025-LkhVYmhU4LKx3oZxcSmWC6Y4X2FkicK"
//   let access_secret = keys.TWITTER_TOKEN_SECRET

  
//   let screen_name = "priyankaraju02"
//   let oauth_signature_method = ""
//   let unixTime = new Date().getTime() / 1000;
//   unixTime = unixTime.toFixed()
  
//   var options = {
//     'method': 'GET',
//     'url': 'https://api.twitter.com/1.1/statuses/home_timeline.json?screen_name=priyankaraju02',
//     'headers': {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'Authorization': 'OAuth oauth_consumer_key=\"' + consumer_key + '\" ,oauth_token=\"' + access_token + '\",oauth_signature_method="HMAC-SHA256",oauth_timestamp="1586535580",oauth_nonce="TP0uTkbtlhr",oauth_version="1.0",oauth_signature="rCHK5f3ROOsiUnYf8bfMnQGsAGJV%2FN1CoDFyVhhzzRw%3D',
//       'Cookie': 'personalization_id="v1_RHKOjvrq1bo8tZLRPy2oWQ=="; lang=en; guest_id=v1%3A158653225846368808',
//     }  
//   };

//   request(options, function (error, response,body) { 
//     if (error) throw new Error(error);
//     if(response.statusCode  == "200"){
//       let user_timeline =JSON.parse(response.body)
//       user_timeline.map(u_name => {
//         u_name.screen_name = screen_name
//       })

//       //code to upload user time  to mongodb
//       const uri = keys.MONGODB_URI
//       const client = new MongoClient(uri, { useNewUrlParser: true });
//       client.connect(err => {
//         const collection = client.db("test").collection("user_time_line").insertMany(user_timeline);
//         if(err){
//           console.log(err)
//         }
//         client.close();
//       });
//       // console.log(user_timeline)
//       res.json({"data " : response.body, "status" : response.statusCode})
//     }
//     else{
//       res.json({"message ":"internal server error","status":"500"})
//     } 
//   });
// });



// router.get("/timeline", async (req, res) => {
//   console.log("fetc from db")
//   let screenName = "priyankaraju02"
//   findOne();
//   async function findOne() {
//     const url = keys.MONGODB_URI
//     let screenName = "priyankaraju02"
//     const client = await new MongoClient.connect(url, { useNewUrlParser: true })
//       .catch(err => { console.log(err); });
//       if (!client) {
//         console.log("if part")
//         res.json({"status":"500","message":"failed"})
//           return;
//       }
//       try {

//           const db = client.db("test");

//           let collection = db.collection('user_time_line');

//           // let query = { "screen_name ": "priyankaraju02" }

//           let responds = await collection.find({"screen_name":"priyankaraju02"}).limit(5).toArray()
//           console.log("new fun")
//           console.log(responds);
//           // return res
//           res.json({"data":responds,"message":"success"})

//       } catch (err) {

//           console.log(err);
//           res.json({"status":"500","message":"failed"})
//       } finally {
    
//           client.close();
//       }
//   }


// });



 
// module.exports = router;


//Code to get oauth signature

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

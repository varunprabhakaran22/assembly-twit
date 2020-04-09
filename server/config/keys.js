// ADD YOUR OWN KEYS AND RENAME THIS FILE TO keys.js
const TWITTER_TOKENS = {
    TWITTER_CONSUMER_KEY: "yUT02IJbXkmh4pzh2uZcw1jX8",
    TWITTER_CONSUMER_SECRET: "6ddvXruhDlmxLTu6UipunJaPCaQqe4RdRn4GAcJw6nE7IH6nhR",
    TWITTER_ACCESS_TOKEN: "4326378313-Hp5kCrlc4LxM0Mjg5EOY2znhz4NGrLrrU1rkI5z",
    TWITTER_TOKEN_SECRET: "LMsFzF2K69RzmcNnO4XSfqCLd8RLvnaRnhDWiz9kLTA1M"
  };
  
  const DB_USER = "varun";
  const DB_PASSWORD = "testpassword";
  const MONGODB = {
    MONGODB_URI: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-bhfp5.mongodb.net/test?retryWrites=true&w=majority`
  };
  
  const SESSION = {
    COOKIE_KEY: "thisappisawesome"
  };
  
  const KEYS = {
    ...TWITTER_TOKENS,
    ...MONGODB,
    ...SESSION
  };
  
  module.exports = KEYS;


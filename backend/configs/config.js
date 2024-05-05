let dotenv = require("dotenv");
dotenv.config();
const config = {
    localhost: "http://localhost:3001",
    mongo: {
      secret: "cmpe295_secret_key_2023", //DB pw, invalid for now
      mongoDBURL: process.env.MONGO_URI
        
        
    },
    //awsRDS: {
    //host: "database-1.cmp17zmn4nqy.us-east-1.rds.amazonaws.com",
    //user: "admin",
    //password: "cmpe295project",
    //database: "stack-overflow-db",
    //},
    remoteURL: "localhost",
  };
  
  module.exports = config;
  
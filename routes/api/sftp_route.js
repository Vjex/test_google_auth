const express = require("express");
const {OAuth2Client} = require('google-auth-library');
var FIREBASE_CLIENT_ID = "Your Client ID Goes HERE";
const client = new OAuth2Client(FIREBASE_CLIENT_ID);//FIREBASE_CLIENT_ID replace with your cliemnt ID


const router = express.Router();


router.get(
    "/check",
    async (req, res, next) =>{
        try {
            
            const {OAuth2Client} = require('google-auth-library');
            const client = new OAuth2Client("FIREBASE_CLIENT_ID");//FIREBASE_CLIENT_ID replace with your cliemnt ID
                var token = "Your Token Goes HERE";
              const ticket = await client.verifyIdToken({
                  idToken: token,
                  audience: FIREBASE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                  // Or, if multiple clients access the backend:
                  //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
              });
              const payload = ticket.getPayload();
              const userid = payload['sub'];
            console.log('User ID  : '+userid);

              // If request specified a G Suite domain:
              // const domain = payload['hd'];
        } catch (error) {
            console.log('ERROR  : '+error);
        }
       
        
       
    }
);

module.exports = router;
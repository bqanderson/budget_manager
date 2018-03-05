const mongoose = require('mongoose');
      jwt = require('jsonwebtoken');
      config = require('@config');

const api = {}; // Empty 'api' object to store every method we want inside

api.login = (User) => (req, res) => { // login method: 'User' param accesses the User model | standard Node.js 'req', 'res' params
  User.findOne({ username: req.body.username }, (error, user) => {  // Find User by username...
    if(error) throw error;  // ... and throw any errors

    if(!user) res.status(401).send({ success: false, message: 'Authentication failed. User not found.' });  // Auth failed, no user found by that name
    else {
      user.comparePassword(req.body.password, (error, matches) => { // Call User model method 'comparePassword' to verify user's password...
        if(matches && !error){  // If we have a match and there are no errors...
          const token = jwt.sign({ user }, config.secret); // Create a token from jsonwebtoken & pass 'secrect' from config/index.js
          res.json({ success: true, message: 'Token granted', token }); // Send json response with 'token'
        }else{
          res.status(401).send({ success: false, message: 'Authentication failed. Wrong password' }); // Auth failed, wrong password for user
        }
      });
    }
  });
}

api.verify = (headers) => {
  if(headers && headers.authorization){ // Verify headers and headers authorization
    const split = headers.authorization.split(' '); // Split header authorization...
    if(split.length === 2) return split[1]; // ... and return Authorization header
    else return null;
  } else return null;
}

module.exports = api; // Export api object

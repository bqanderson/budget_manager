const mongoose = require('mongoose');

const api = {}; // Empty 'api' object to store API methods

api.signup = (User) => (req, res) => {  // Sign Up method used to create new accounts
  if (!req.body.username || !req.body.password)  // If username and password ARE empty...
    res.json({ success: false, message: 'Please, pass username and password' });  // ...Send message requesting that they are 'passed'
  else { // If both username and password ARE NOT empty...
    const newUser = new User({  // ...Create a new User with...
      username: req.body.username,  // ...requested username and...
      password: req.body.password,  // ...requested password with...
      clients: [] // ...an empty clients array
    });

    newUser.save((error) => { // Save method for new User Object
      if(error) return res.status(400).json({ success: false, message: 'Username already exists' });  // If there are errors, 'Username already exists'
      res.json({ success: true, message: 'Account created successfully' }); // 'Account created successfully' | respond with json
    })
  }
}

module.exports = api;

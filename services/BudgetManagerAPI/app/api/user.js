const mongoose = require('mongoose');

const api = {}; // Empty 'api' object to store API methods

api.setup = (User) => (req, res) => { // Temp methods for creating 'admin' user for debugging (not used in deployment)
  const admin = new User({  // Create new User Object using preset values for...
    username: 'admin',  // ...username ('admin') and...
    password: 'admin',  // ...password ('admin') with...
    clients: [] // ...an empty clients array
  });

  admin.save(error => { // Save method for 'admin' User Object
    if(error) throw error;  // Throw any errors
    console.log('Admin account was successfully set up'); // Console log message of success
    res.json({ success: true }) // send json response
  })
}

api.index = (User, BudgetToken) => (req, res) => {  // Test method allowing visibility of all registered users
  const token = BudgetToken;
  if(token){  // As long as token is true...
    User.find({}, (error, users) => { // ...find all users, then...
      if(error) throw error;  // ...throw all errors (if any), and...
      res.status(200).json(users);  // ...send json response of all users
    });
  } else return res.status(403).send({ success: false, message: 'Unauthorized' });  // Else, send response 'Unauthorized'
}

api.signup = (User) => (req, res) => {  // Sign Up method used to create new accounts
  if(!req.body.username || !req.body.password)  // If username and password ARE empty...
    res.json({ success: false, message: 'Please, pass username and password' });  // ...Send message requesting that they are 'passed'
  else{ // If both username and password ARE NOT empty...
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

// Used to insure that models are loaded before anything else
const mongoose = require('mongoose'),
      UserModel = require('@BudgetManagerModels/user');

const models = {
  User: mongoose.model('User')
}
module.exports = models;

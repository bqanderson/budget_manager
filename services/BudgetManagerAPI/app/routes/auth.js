const models = require('@BudgetManager/app/setup');

module.exports = (app) => { // Pass our own app to gain ability to set our routes
  const api = app.BudgetManagerAPI.app.api.auth;  // Used to gain access to 'BudgetManagerAPI/app/api/auth.js' file

  app.route('/')
    .get((req, res) => res.send('Budget Manager API'));

  app.route('/api/v1/auth')
    .post(api.login(models.User));  // Login api method using User model as argument (accessed via POST)
}

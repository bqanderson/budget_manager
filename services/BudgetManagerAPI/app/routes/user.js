const models = require('@BudgetManager/app/setup');

module.exports = (app) => { // Pass app to gain ability to set routes
  const api = app.BudgetManagerAPI.app.api.user;  // Access 'BudgetManagerAPI/app/api/user.js' file

  app.route('/api/v1/signup')
    .post(api.signup(models.User));
}

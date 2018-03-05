const passport = require('passport')
      config = require('@config'),
      models = require('@BudgetManager/app/setup');

module.exports = (app) => { // Pass app to gain ability to set routes
  const api = app.BudgetManagerAPI.app.api.user;  // Access 'BudgetManagerAPI/app/api/user.js' file

  app.route('api/v1/setup')
    .post(api.setup(models.User));

  app.route('api/v1/users')
    .get(passport.authenticate('jwt', config.session), api.index(models.User, app.get('budgetsecret')));

  app.route('api/v1/signup')
    .post(api.signup(models.User));
}

require('module-alias/register');
const http = require('http'),
      BudgetManagerAPI = require('@BudgetManagerAPI'),  // '@BudgetManagerAPI' === './services/BudgetManagerAPI/config' (per module_alias NPM package)
      BudgetManagerServer = http.Server(BudgetManagerAPI),
      BudgetManagerPORT = process.env || 3001,
      LOCAL = '0.0.0.0';
BudgetManagerServer.listen(BudgetManagerPORT, LOCAL, () => console.log('BudgetManagerAPI is running on ${BudgetManagerPORT}'));

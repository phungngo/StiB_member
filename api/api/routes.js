'use strict';
module.exports = function (app) {
  let productsCtrl = require('./controllers/UsersController');

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // todoList Routes
  app.route('/api/users')
    .get(productsCtrl.get)
    .post(productsCtrl.store);

  app.route('/api/users/:id')
    .delete(productsCtrl.delete);
};
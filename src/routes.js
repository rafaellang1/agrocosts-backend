const express = require('express');

const UserController = require('./app/controllers/userController');
const FarmController = require('./app/controllers/farmController');

const routes = express.Router();

// obtendo informaçoes: get
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.delete);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);

routes.get('/farms', FarmController.index);
routes.get('/farms/:id', FarmController.show);
routes.delete('/farms/:id', FarmController.delete);
routes.post('/farms', FarmController.store);
routes.put('/farms/:id', FarmController.update);

module.exports = routes;

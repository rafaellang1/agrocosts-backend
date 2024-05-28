const express = require('express');

const UserController = require('./app/controllers/userController');

const routes = express.Router();

// obtendo informaçoes: get
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.delete);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);

module.exports = routes;

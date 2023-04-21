const express = require('express');
const { check, body } = require('express-validator');
const db = require('../models');

//Middlewares
const isAuth = require('../app/Http/Middleware/authMiddleware');
const isLoggedIn = require('../app/Http/Middleware/isUserLoggedIn');
const homeController = require('../app/Http/Controllers/HomeController');

//Controllers
const reqController = require('../app/Http/Controllers/Admin/Requests/RequestController');
const brandController = require('../app/Http/Controllers/Admin/Brand/BrandController');
const userController = require('../app/Http/Controllers/Admin/Users/UserController');

const route = express.Router();

route.get('/request', reqController.index);
route.get('/createrequest', reqController.create);
route.post('/request/update/:id', isAuth, reqController.update);
route.get('/editrequest/:id', reqController.edit);
route.post('/request/delete/:id', isAuth, reqController.delete);
route.post('/request/store', isAuth, reqController.store);

route.get('/brand', brandController.index);
route.get('/brand/create', isAuth, brandController.create);
route.post('/brand/update/:id', isAuth, brandController.update);
route.get('/brand/edit/:id', isAuth, brandController.edit);
route.post('/brand/delete/:id', isAuth, brandController.delete);
route.post('/brand/store', isAuth, brandController.store);

route.get('/user', userController.index);
route.post('/user/create', userController.create);
route.post('/user/update/:id', isAuth, userController.update);
route.get('/user/edit/:id', isAuth, userController.edit);
route.post('/user/delete/:id', isAuth, userController.delete);
route.post('/user/store', isAuth, userController.store);

route.get('/', homeController.welcome);
module.exports = route;

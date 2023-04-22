const express = require('express');
const { check, body } = require('express-validator');
const db = require('../models');

//Middlewares
const isAuth = require('../app/Http/Middleware/authMiddleware');
const isLoggedIn = require('../app/Http/Middleware/isUserLoggedIn');

//Controllers
const reqController = require('../app/Http/Controllers/Admin/Requests/RequestController');
const brandController = require('../app/Http/Controllers/Admin/Brand/BrandController');
const uploadController = require('../app/Http/Controllers/Admin/UploadController');
const homeController = require('../app/Http/Controllers/HomeController');
const commentController = require('../app/Http/Controllers/Admin/CommentController');

const route = express.Router();

route.get("/request", reqController.index);
route.get('/createrequest', reqController.create);
route.post('/request/update/:id',reqController.update);
route.get('/editrequest', reqController.edit);
route.post('/request/delete/:id',reqController.delete);
route.post('/request/store', reqController.store);
route.post('/request/draft', reqController.draft);

route.get("/brands", brandController.index);
route.get('/brand/create', brandController.create);
route.post('/brand/update/:id', brandController.update);
route.get('/brand/edit/:id', brandController.edit);
route.post('/brand/delete/:id', brandController.delete);
route.post('/brand/store', brandController.store);

route.post('/upload/:type', uploadController.load);
route.post('/multidownload', uploadController.down);
route.post('/delete/:id', uploadController.delete);

route.post('/comment/create', isAuth, commentController.create);
route.get('/comment/:id', commentController.get);

route.get('/',homeController.welcome);
module.exports = route;
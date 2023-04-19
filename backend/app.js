const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const csrf = require('csurf');
const flash = require('connect-flash');


// const dbConnect = require('./config/database');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

const app = express();

app.set('view engine','ejs');
app.set('views','resource/views');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use(session({
    name: "my-session-name",
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { /*maxAge: 60000*/ },
   // cookie: { secure: true, httpOnly: true }
}));
app.use(flash());

app.use((req, resp, next) => {
    resp.locals.csrfToken = req.csrfToken();
    resp.locals.auth = req.session.auth? req.session.auth : false;
    resp.locals.username = req.session.username? req.session.username : '';
    resp.locals.roles = req.session.roles?req.session.roles:'';
    resp.locals.routeName = req.originalUrl.split('/')[1];
    resp.locals.message = req.flash();
    next();
});

app.use(webRoutes);
app.use(apiRoutes);

 app.use((req,resp,next) => {
    // resp.status(404).sendFile(path.join(__dirname,'views','errors','404.html'));
    resp.status(404).render('errors/404');
 });

 app.use((error,req,resp,next) => {
    // resp.status(404).sendFile(path.join(__dirname,'views','errors','404.html'));
    resp.status(500).render('errors/500',{
        error: error
    });
 });
 
app.listen(8000);

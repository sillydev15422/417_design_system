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

app.set('view engine', 'ejs');
app.set('views', 'resource/views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(apiRoutes);

app.use((req, resp, next) => {
  resp
    .status(404)
    .sendFile(path.join(__dirname, 'resource/views/power/404.html'));
});

app.use((error, req, resp, next) => {
  console.log(error);
  resp
    .status(500)
    .sendFile(path.join(__dirname, 'resource/views/power/500.html'));
});

app.listen(8000);

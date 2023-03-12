const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const env = require('dotenv').config();
const cookieParser = require('cookie-parser');
const { auth, requiresAuth } = require('express-openid-connect');

app.set('view engine', 'ejs');
app.set('views', 'views/partials');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.set(cookieParser('name', 'value', {
    sameSite: 'none',
    secure: true
}));
// logMod goes to login and logout Auth0
const logMod = require("./routes/login");
// homeMode just displays home.ejs
const homeModule = require("./routes/home");

app.use('/', logMod);
app.use('/home', homeModule);

// app.use('/', homeModule);
app.listen(3000);


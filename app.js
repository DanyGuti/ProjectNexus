const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const env = require('dotenv').config();
const cookieParser = require('cookie-parser');
const { auth, requiresAuth } = require('express-openid-connect');
const { initRoutes } = require('./routes');

const config = {
    authRequired: false,
    idpLogout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    routes: {
        login: false,
    }
};

app.use(auth(config));
app.set('view engine', 'ejs');
app.set('views', 'views/partials');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

app.set(cookieParser('name', 'value', {
    sameSite: 'none',
    secure: true
}));

initRoutes(app);

// app.use('/', homeModule);
app.listen(3000);


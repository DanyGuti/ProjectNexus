const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const env = require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');


app.set('view engine', 'ejs');
app.set('views', 'views/partials');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(
    auth({
        authRequired: false,
        idpLogout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
        routes:{
            login:false,
            postLogoutRedirect: '/custom-logout',
            callback: false,
        }
    })
);

app.get('/', requiresAuth(), (req, res) =>{
    res.send('Login accepted');
});

app.get('/home', (req, res) =>{
    req.oidc.isAuthenticated ? res.render(__dirname +'/views/home') : res.send('Logged Out');
});

app.get('/login', (req, res) =>
    res.oidc.login({
        returnTo: '/home',
        authorizationParams: {
            redirect_uri: 'http://localhost:3000/callback',
        },
    })
);

app.get('/custom-logout', (req, res) => res.send('Bye!'));

app.get('/callback', (req, res) =>
    res.oidc.callback({
        redirectUri: 'http://localhost:3000/callback',
    })
);

app.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
    res.oidc.callback({
        redirectUri: 'http://localhost:3000/callback',
    })
);

// const homeModule = require('./routes/home');
// app.use('/', homeModule);
app.listen(3000);


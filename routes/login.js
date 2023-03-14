const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');

let router = express.Router();

router.use(auth({
    authRequired: false,
    idpLogout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    routes: {
        login: false,
    },
}));

router.get('/', async (req, res) => {
    res.oidc.login({
        returnTo: '/login',
        authorizationParams: {
            response_type: 'code id_token',
            redirect_uri: 'http://localhost:3000/callback',
            scope: 'openid profile email name picture middle_name'
        },
    })
});

router.get('/login', async (req, res) => {
    try{
        const userInfo = await req.oidc.fetchUserInfo();
        res.render(__dirname + '/../views/home', { user: userInfo });
    }catch(err){
        requiresAuth();
    }
});

router.onExecutePostLogin = async (event, api) => {
    if (!event.user.email_verified) {
        api.access.deny("Please verify your email before logging in.");
    }
};

router.get('/callback', (req, res) =>
    res.oidc.callback({
        redirectUri: 'http://localhost:3000/callback',
    })
);

router.post('/callback', express.urlencoded({ extended: false }), (req, res) =>
    res.oidc.callback({
        redirectUri: 'http://localhost:3000/callback',
    })
);

module.exports = router;

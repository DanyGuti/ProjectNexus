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
}));

// router.get('/', (req, res) => {
//     // res.oidc.logout({
//     //     returnTo: 'https://dev-np42ijmoq4lhkv7t.us.auth0.com/oidc/logout',
//     // })
// });

module.exports = router;
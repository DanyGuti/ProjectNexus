const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
// const homeController = require('../controllers/home.controller');

let router = express.Router();

router.get('/', requiresAuth(), async (req, res) => {
    try{
        const userInfo = await req.oidc.fetchUserInfo();
        res.render(__dirname + '/../views/home', { user: userInfo });
    } catch(e){
        res.redirect('/');
    }
});

module.exports = router;
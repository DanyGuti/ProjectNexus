const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');

let router = express.Router();


router.get('/', requiresAuth(),(req, res) =>{
    res.render(__dirname + '/../views/home');
});

// router.get('/logout', (req, res) =>{

// });
module.exports = router;
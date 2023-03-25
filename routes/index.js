const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const router = express.Router();

const homeRoutes = require('./home.routes');
const loginRoutes = require('./login.routes');
const userRoutes = require('./user.routes');


module.exports.initRoutes = (app) => {
    app.use('/', loginRoutes);
    app.use('/user', userRoutes);
    app.use('/home', homeRoutes);
    app.use((req, res) => {
        res.sendStatus(404);
    })
}

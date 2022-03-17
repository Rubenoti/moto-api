const UserRoutes = require('express').Router();

const {
    loginUser,
    logoutUser,
    registerUser } = require('./user.controller');

UserRoutes.post('/login', loginUser);
UserRoutes.post('/logout', logoutUser);
UserRoutes.post('/register', registerUser);

module.exports = UserRoutes;
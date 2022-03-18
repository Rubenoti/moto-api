const UserRoutes = require('express').Router();
const { isAuth } = require('../../middlewares/auth/auth');

const {
    loginUser,
    logoutUser,
    registerUser } = require('./user.controller');

UserRoutes.post('/login', loginUser);
UserRoutes.post('/logout', [isAuth], logoutUser);
UserRoutes.post('/register', registerUser);

module.exports = UserRoutes;
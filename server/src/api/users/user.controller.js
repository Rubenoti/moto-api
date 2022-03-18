const User = require('./user.model');
const { setError } = require('../../utils/errors/errors');
const bcrypt = require('bcrypt');
const JwtUtils = require('../../utils/jwt/jwt');

const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(setError(404, "User not found"))
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = JwtUtils.generateToken(user);
            res.status(200).json(token);
        }

    } catch (error) {
        return next(setError(500, "Fail to login user"))
    }
}
const logoutUser = async (req, res, next) => {
    try {
        const token = null
        return res.status(200).json(token);
    } catch (error) {
        return next(setError(500, "Fail to logout user"))
    }
}
const registerUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const userDuplicate = await User.findOne({ email: user.email });
        if (userDuplicate) {
            return next(setError(409, "User already exists"))
        }
        const createUser = await user.save();
        res.status(201).json(createUser);
    } catch (error) {
        return next(setError(500, "Fail to register user"))
    }
}

module.exports = {
    loginUser,
    logoutUser,
    registerUser
}
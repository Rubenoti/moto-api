const { setError } = require('../../utils/errors/errors');
const User = require('../../api/users/user.model');
const JwtUtils = require('../../utils/jwt/jwt');

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(setError(401, "No token provided"));
        }
        const parsedToken = token.replace("Bearer ", "");
        const validToken = JwtUtils.verifyToken(parsedToken, process.env.SECRET);
        const userLogued = await User.findById(validToken.id);
        req.user = userLogued;
        next();
    } catch (error) {
        return next(setError(401, "server failed to authenticate"));
    }
}

module.exports = { isAuth };
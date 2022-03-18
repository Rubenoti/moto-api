const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { setError } = require('../../utils/errors/errors');
const { validationPassword, validationEmail } = require('../../utils/validators/validators');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        password: { type: String, required: true, trim: true },
    },
    {
        timestamps: true
    });

userSchema.pre('save', function (next) {
    if (!validationEmail(this.email)) {
        return next(setError(400, "Email is not valid"))
    }
    if (!validationPassword(this.password)) {
        return next(setError(400, "Password is not valid"))
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();

})

const User = mongoose.model('users', userSchema);
module.exports = User;
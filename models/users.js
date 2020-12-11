const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true },
    username: { type: String, unique:true},
    deactivated: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isVerified: {type: Boolean, default:false}
});

UserSchema.pre('save',
    async function (next) {
        const user = this;
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    })


UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

UserSchema.methods.generateJWTToken = function() {
    // more pay load can also be added
    const token = jwt.sign({ username: this.username, admin: this.isAdmin }, 'secret', {
        expiresIn: 86400,
    });
    return token;
};

module.exports = mongoose.model('user', UserSchema);
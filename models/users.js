const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true },
    username: { type: String },
    deactivated: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
});

UserSchema.pre('save',
    async function (next) {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);
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
    const token = jwt.sign({ userName: this.userName }, 'secret', {
        expiresIn: 86400,
    });
    return token;
};

module.exports = mongoose.model('user', UserSchema);
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: 'UserName  "{VALUE}" already exist',
    required: 'UserName is required',
  },
  email: {
    type: String,
    unique: 'User with email "{VALUE}" already exist',
    lowercase: true,
    required: 'Email is required',
    trim: true,
  },

  hash: {
    type: String,
    unique: 'Hash mast be unique',
  },
  password: {
    type: String,
    required: 'Password is required',
    trim: true,
  },
  admin: {
    type: String,
  },
  isConfirm: {
    type: Boolean,
  },
  refreshToken: {
    type: String,
  },
  confirmAccountTokenExpires: {
    type: Date,
  },
});

UserSchema.statics.createFields = ['email', 'password', 'isConfirm'];

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const salt = bcryptjs.genSaltSync(10);

    this.password = bcryptjs.hashSync(this.password, salt);
  }

  if (!this.hash) {
    this.hash = uuidv4();
  }

  next();
});
UserSchema.methods.comparePasswords = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

const User = mongoose.model('user', UserSchema);
module.exports = User;

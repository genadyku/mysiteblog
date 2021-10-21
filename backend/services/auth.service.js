//const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const AppError = require('../utils/AppError');
/*
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
*/

const reset = async (resetPasswordToken, newPassword) => {
  try {
  

 
  const decoded = jwt.verify(resetPasswordToken, process.env.SECRET);
  
   const currentUser = await User.findById(decoded.data);
   const UserUpdate = await User.findOneAndUpdate({_id: currentUser._id, }, { $set: { password : newPassword } } );
      
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

module.exports = {
  
  reset,
};

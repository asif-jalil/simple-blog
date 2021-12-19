const mongoose = require("mongoose");
const User = require("./user.model.practice");

module.exports.createUser = (userInfo) => {
  return User.create(userInfo)
}

module.exports.findUserByEmail = (email) => {
  return User.findOne({email: email})
}
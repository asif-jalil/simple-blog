const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("./user.service.practice");

function hashPassword(password, saltRound) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRound, function (err, hash) {
      err && reject(err);
      resolve(hash);
    });
  });
}

function comparePassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      err && reject(err);
      resolve(res);
    });
  });
}

module.exports.register = async (req, res) => {
  try {
    const { body } = req;
    const saltRound = 10;
    body.password = await hashPassword(body.password, saltRound);
    const user = await userService.createUser(body);
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;

    const token = await jwt.sign(
      {
        data: userObj,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      error: false,
      data: null,
      token: token,
      message: "Registration successful",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      data: null,
      token: null,
      message: "something went wrong",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { body } = req;
    const user = await userService.findUserByEmail(body.email);
    const matchPassword = await comparePassword(body.password, user.password);

    if (!matchPassword) {
      return res.status(400).json({
        error: false,
        data: null,
        token: null,
        message: "User credentials didn't matched",
      });
    }

    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;

    const token = await jwt.sign(
      {
        data: userObj,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h"
      }
    );

    return res.status(200).json({
      error: false,
      data: null,
      token: token,
      message: "Login Successfully"
    })
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: true,
      data: null,
      token: null,
      message: "something went wrong"
    })
  }
};

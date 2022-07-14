const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
    const quary = req.query;
    const limit = quary.limit;

    try{
   const users = await User.find()
    .sort({createdAt: -1})
    // .populate('posts')
    .limit(limit)

    res.status(200).json({
        results: users.length,
        users,
        success: true,
      });
    } catch (error) {
        res.status(400).json({
          error,
          success: false,
        });
      }
}

exports.signup = async (req, res) => {
  let message;
  try {
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).json({
        message: "Please provide email, password and name",
      });
    }

    // checking is user exist
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    // adding a new user
    user = await User.create(req.body);

    // giving the jwt token
    const token = await user.generateAuthToken();

    res.status(201).json({
      user,
      token,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
      message,
    });
  }
};

exports.login = async (req, res) => {
  let message;
  try {
    // checking is there have email and password
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // checking the user
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
      });
    }

    // checking the password
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    // generating a jwt
    const token = await user.generateAuthToken();

    res.status(200).json({
      user,
      token,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
      message,
    });
  }
};

// verify token
exports.verifyToken = async (req, res, next) => {
  let message;
  try {
    const token = req.body.jwt;
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    // req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
      message,
    });
  }
};

exports.checkLoggedIn = async (req, res) => {

  let message;
  try {
    if (!req.body.jwt) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const decoded = jwt.verify(req.body.jwt, process.env.JWT_SECRET);
    let user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
      message,
    });
  }
};

exports.logout = async (req, res) => {
  let message;
  try {
    if (!req.body.jwt) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const decoded = jwt.verify(req.body.jwt, process.env.JWT_SECRET);
    let user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      error,
      success: false,
      message,
    });
  }
};



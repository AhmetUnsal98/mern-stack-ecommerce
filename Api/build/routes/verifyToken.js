"use strict";

var _jsonwebtoken = require("jsonwebtoken");
//Middleware for generating tokens for requests
const verifyToken = (req, res, next) => {
  //Get headers from requests and pass them to middleware
  const authHeader = req.headers.token;

  //Check is there a token
  if (authHeader) {
    //Take token from auth headers
    const token = authHeader;
    //Verify token with jwt secret password

    _jsonwebtoken.jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is invalid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json(err);
  }
};
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      return next();
    } else {
      return res.status(403).json("You are not allowed to access this");
    }
  });
};
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(403).json("You are not allowed to access this");
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
};
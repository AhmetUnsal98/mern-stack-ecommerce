"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _users = _interopRequireDefault(require("../db/users"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _nanoid = _interopRequireDefault(require("../utils/nanoid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = router => {
  router.post("/login", async (req, res) => {
    const {
      email,
      password
    } = req.body;
    const user = await _users.default.findOne({
      email: email
    });
    if (user === null) {
      console.log("User not found");
    }
    const passwordConfirmed = await _bcryptjs.default.compare(password, user.password);
    if (passwordConfirmed) {
      const accessToken = _jsonwebtoken.default.sign({
        id: user._id,
        isAdmin: user.role
      }, process.env.JWT_SECRET, {
        expiresIn: "3d"
      });
      const {
        password,
        ...others
      } = user._doc;
      res.json({
        ...others,
        accessToken
      });
    } else {
      console.log("Wrong password");
    }
  });
  router.post("/login/guest", async (req, res) => {
    const id = (0, _nanoid.default)();
    const name = `guest - ${id}`;
    const surname = `guest - ${id}`;
    const email = req.body.email;
    const user = {
      avatarColor: "green",
      avartarUrl: "https://i.pravatar.cc/300",
      cardUserKey: "",
      email: email,
      identityNumber: "000000000000",
      ip: "85.34.78.112",
      locale: "tr",
      name: name,
      surname: surname,
      uid: id,
      _id: id,
      role: "guest"
    };
    if (user) {
      const accessToken = _jsonwebtoken.default.sign({
        id: user._id,
        isAdmin: user.role
      }, process.env.JWT_SECRET, {
        expiresIn: "3d"
      });
      const {
        uid,
        ...others
      } = user;
      res.json({
        ...others,
        accessToken
      });
    } else {
      console.log("User not found");
    }
  });
  router.post("/register", async (req, res) => {
    const newUser = new _users.default({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
      console.log(savedUser);
    } catch (error) {
      console.log(error);
    }
  });
};
exports.default = _default;
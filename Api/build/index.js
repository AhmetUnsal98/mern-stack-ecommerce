"use strict";

require("express-async-errors");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = _interopRequireDefault(require("./config.js"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _https = _interopRequireDefault(require("https"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cors = _interopRequireDefault(require("cors"));

var _ApiError = _interopRequireDefault(require("./error/ApiError.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _passportJwt = require("passport-jwt");

var _users = _interopRequireDefault(require("./db/users.js"));

var _Session = _interopRequireDefault(require("./middlewares/Session.js"));

var _index2 = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const envPath = _config.default?.production ? "./env/.prod" : "./env/.dev";

_dotenv.default.config({
  path: envPath,
}); //Begin mongodb connection

_mongoose.default
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => console.log(err));

const app = (0, _express.default)();

const router = _express.default.Router();

app.use((0, _helmet.default)());

app.use((0, _morgan.default)(process.env.LOGGER));
app.use(
  _express.default.json({
    limit: "1mb",
  })
);
app.use(
  _express.default.urlencoded({
    extended: true,
  })
);

_passport.default.serializeUser((user, done) => {
  done(null, user);
});

_passport.default.deserializeUser((id, done) => {
  done(null, id);
});

app.use(_passport.default.initialize());
const jwtOpts = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

_passport.default.use(
  new _passportJwt.Strategy(jwtOpts, async (jwtPayload, done) => {
    try {
      const user = await _users.default.findOne({
        _id: jwtPayload._id,
      });

      if (user) {
        done(null, user.toJSON());
      } else {
        done(
          new _ApiError.default(
            "Authorization is not valid",
            401,
            "authorizationInvalid"
          ),
          false
        );
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

_index2.default.forEach((routeFn, index) => {
  routeFn(router);
});

app.use("/api", router);
app.get("/test-auth", _Session.default, (req, res) => {
  res.json({
    test: true,
  });
});
app.use(_GenericErrorHandler.default);

if (process.env.HTTPS_ENABLED === "true") {
  const key = _fs.default
    .readFileSync(_path.default.join(__dirname, "./certs/key.pem"))
    .toString();

  const cert = _fs.default
    .readFileSync(_path.default.join(__dirname, "./certs/cert.pem"))
    .toString();

  const server = _https.default.createServer(
    {
      key: key,
      cert: cert,
    },
    app
  );

  server.listen(process.env.PORT, () => {
    console.log(
      "Express uygulamamız ",
      process.env.PORT,
      "Üzerinden çalışmakta"
    );
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(
      "Express uygulamamız ",
      process.env.PORT,
      "Üzerinden çalışmakta"
    );
  });
}

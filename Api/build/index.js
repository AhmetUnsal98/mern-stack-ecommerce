"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _config = _interopRequireDefault(require("./config.js"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _https = _interopRequireDefault(require("https"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _helmet = _interopRequireDefault(require("helmet"));
var _cors = _interopRequireDefault(require("cors"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _index = _interopRequireDefault(require("./routes/index"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const envPath = _config.default?.production ? "./env/.prod" : "./env/.dev";
_dotenv.default.config({
  path: envPath
});
//Begin mongodb connection
_mongoose.default.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDb");
}).catch(err => console.log(err));
const app = (0, _express.default)();
const router = _express.default.Router();
app.use((0, _helmet.default)());
app.use((0, _cors.default)({
  origin: "*"
}));
app.use((0, _morgan.default)(process.env.LOGGER));
app.use(_express.default.json({
  limit: "1mb"
}));
app.use(_express.default.urlencoded({
  extended: true
}));
_index.default.forEach((routeFn, index) => {
  routeFn(router);
});
app.use("/api", router);
if (process.env.HTTPS_ENABLED === "true") {
  const key = _fs.default.readFileSync(_path.default.join(__dirname, "./certs/key.pem")).toString();
  const cert = _fs.default.readFileSync(_path.default.join(__dirname, "./certs/cert.pem")).toString();
  const server = _https.default.createServer({
    key: key,
    cert: cert
  }, app);
  server.listen(process.env.PORT, () => {
    console.log("Express uygulamamız ", process.env.PORT, "Üzerinden çalışmakta");
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log("Express uygulamamız ", process.env.PORT, "Üzerinden çalışmakta");
  });
}
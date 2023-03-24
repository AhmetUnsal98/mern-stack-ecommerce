"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _auth = _interopRequireDefault(require("./auth"));
var _products = _interopRequireDefault(require("./products"));
var _categories = _interopRequireDefault(require("./categories"));
var _orders = _interopRequireDefault(require("./orders"));
var _payments = _interopRequireDefault(require("./payments"));
var _users = _interopRequireDefault(require("./users"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = [_auth.default, _products.default, _categories.default, _orders.default, _payments.default, _users.default];
exports.default = _default;
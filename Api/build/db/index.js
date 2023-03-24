"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _users = _interopRequireDefault(require("./users"));
var _products = _interopRequireDefault(require("./products"));
var _orders = _interopRequireDefault(require("./orders"));
var _paymentSucces = _interopRequireDefault(require("./payment-succes"));
var _paymentFailed = _interopRequireDefault(require("./payment-failed"));
var _categories = _interopRequireDefault(require("./categories"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = [_users.default, _products.default, _paymentFailed.default, _paymentSucces.default, _orders.default, _categories.default];
exports.default = _default;
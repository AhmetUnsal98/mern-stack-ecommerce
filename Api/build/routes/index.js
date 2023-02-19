"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _test = _interopRequireDefault(require("./test"));

var _users = _interopRequireDefault(require("./users"));

var _products = _interopRequireDefault(require("./products"));

var _categories = _interopRequireDefault(require("./categories"));

var _carts = _interopRequireDefault(require("./carts"));

var _payments = _interopRequireDefault(require("./payments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [_test.default, _users.default, _products.default, _categories.default, _carts.default, _payments.default];
exports.default = _default;
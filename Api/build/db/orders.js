"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _nanoid = _interopRequireDefault(require("../utils/nanoid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Schema
} = _mongoose.default;
const {
  ObjectId
} = Schema.Types;
const randomColorGenerator = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};
const OrdersSchema = new Schema({
  uid: {
    type: String,
    default: (0, _nanoid.default)(),
    unique: true,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  locale: {
    type: String,
    required: true,
    default: "tr",
    enum: ["tr", "en"]
  },
  products: {
    type: Array,
    required: true
  },
  amount: {
    type: Number
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "shipped", "canceled"],
    default: "pending"
  }
}, {
  _id: true,
  collection: "orders",
  timeStamps: true
});
const Orders = _mongoose.default.model("Orders", OrdersSchema);
var _default = Orders;
exports.default = _default;
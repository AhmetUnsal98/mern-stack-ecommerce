"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _nanoid = _interopRequireDefault(require("../utils/nanoid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Schema
} = _mongoose.default;
const PaymentsFailedSchema = new Schema({
  uid: {
    type: String,
    default: (0, _nanoid.default)(),
    unique: true
  },
  status: {
    type: String,
    required: true,
    enum: ["failure"]
  },
  conversationId: {
    type: String,
    required: true
  },
  errorCode: {
    type: String,
    required: true
  },
  errorMessage: {
    type: String,
    required: true
  },
  log: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  id: true,
  collection: "payments-failed",
  timeStamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      return {
        ...ret
      };
    }
  }
});
const PaymentsFailed = _mongoose.default.model("PaymentsFailed", PaymentsFailedSchema);
var _default = PaymentsFailed;
exports.default = _default;
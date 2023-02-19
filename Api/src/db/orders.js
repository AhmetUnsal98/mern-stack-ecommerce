import mongoose from "mongoose";
import bcrypt from "bcrypt";
import nanoid from "../utils/nanoid";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const randomColorGenerator = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

const OrdersSchema = new Schema(
  {
    uid: {
      type: String,
      default: nanoid(),
      unique: true,
      required: true,
    },
    userId: { type: String, required: true },
    locale: {
      type: String,
      required: true,
      default: "tr",
      enum: ["tr", "en"],
    },
    products: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
    },
    address: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "shipped", "canceled"],
      default: "pending",
    },
  },
  {
    _id: true,
    collection: "orders",
    timeStamps: true,
  }
);
const Orders = mongoose.model("Orders", OrdersSchema);

export default Orders;

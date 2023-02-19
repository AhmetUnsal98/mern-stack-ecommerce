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
const {
  ObjectId
} = Schema.Types;
const ProductsSchema = new Schema({
  uid: {
    type: String,
    default: (0, _nanoid.default)(),
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  size: {
    type: [String],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  categories: {
    type: [String]
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: "TRY",
    enum: ["TRY", "USD", "EUR"]
  },
  stock: {
    type: Number,
    default: 1,
    required: true
  },
  itemType: {
    type: String,
    required: true,
    default: "PHYSICAL"
  }
}, {
  _id: true,
  collection: "products",
  timeStamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      return { ...ret
      };
    }
  }
});

const Products = _mongoose.default.model("Products", ProductsSchema);

Products.starterData = [{
  _id: _mongoose.default.Types.ObjectId("61d054e5a2f56187efb0a3b2"),
  name: "Dress Loungewear Green",
  title: "Dress Loungewear",
  desc: "Good a Loungewear",
  size: ["s", "m", "l"],
  color: "green",
  uid: (0, _nanoid.default)(),
  images: ["https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/lounge2.jpg?alt=media&token=c2a5d723-a159-44f7-9270-cdc472bffe66"],
  categories: ["loungewear"],
  brand: "Versace",
  price: 10000,
  currency: "TRY",
  stock: 10,
  itemType: "PHYSICAL"
}, {
  _id: _mongoose.default.Types.ObjectId("61d054e5a2f56187efb0a3c1"),
  name: "Dress Loungewear Red",
  title: "Dress Loungwear Red",
  desc: "Good Loungewear",
  size: ["s", "m", "l"],
  color: "red",
  uid: (0, _nanoid.default)(),
  images: ["https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/lounge1.jpg?alt=media&token=1a114332-d81f-4a29-999a-2e6d62d9fdf1"],
  categories: ["loungewear"],
  brand: "Versace",
  price: 10000,
  currency: "TRY",
  stock: 10,
  itemType: "PHYSICAL"
}, {
  _id: _mongoose.default.Types.ObjectId("61d054e5a2f56187efb0a3c5"),
  name: "Normal Tshirt Brown",
  title: "Normal Tshirt Brown",
  desc: "Good tshirt",
  size: ["s", "m", "l"],
  color: "black",
  uid: (0, _nanoid.default)(),
  images: ["https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/tshirt2.jpg?alt=media&token=c03e21d3-cf85-49ac-8fba-867e8b1fff9d"],
  categories: ["tshirt"],
  brand: "Versace",
  price: 10000,
  currency: "TRY",
  stock: 10,
  itemType: "PHYSICAL"
}, {
  _id: _mongoose.default.Types.ObjectId("61d054e5a2f56187efb0a3c9"),
  name: "Normal Tshirt",
  title: "Normal Tshirt",
  desc: "Good tshirt",
  size: ["s", "m", "l"],
  color: "black",
  uid: (0, _nanoid.default)(),
  images: ["https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/1659195036176Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg%20(1).png?alt=media&token=1f602469-cd97-4a7e-aaeb-6efe0a68d032"],
  categories: ["tshirt"],
  brand: "Versace",
  price: 10000,
  currency: "TRY",
  stock: 10,
  itemType: "PHYSICAL"
}, {
  _id: _mongoose.default.Types.ObjectId("61d054e5a2f56187efb0a3c0"),
  name: "Prada Jacket",
  title: "Prada Jacket Black",
  desc: "Good Jacket",
  size: ["s", "m", "l"],
  color: "black",
  uid: (0, _nanoid.default)(),
  images: ["https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/jacket.jpg?alt=media&token=d39bab14-c2c2-4bb5-922a-25ae677a4a2c"],
  categories: ["jacket"],
  brand: "Prada",
  price: 10000,
  currency: "TRY",
  stock: 10,
  itemType: "PHYSICAL"
}, {
  _id: _mongoose.default.Types.ObjectId("61d054e5a2f56187efb0a3c0"),
  name: "Light Jacket Black",
  title: "Prada Jacket Black",
  desc: "Good Jacket",
  size: ["s", "m", "l"],
  color: "black",
  uid: (0, _nanoid.default)(),
  images: ["https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/jacket.jpg?alt=media&token=d39bab14-c2c2-4bb5-922a-25ae677a4a2c"],
  categories: ["jacket"],
  brand: "Prada",
  price: 10000,
  currency: "TRY",
  stock: 10,
  itemType: "PHYSICAL"
}];

Products.initializer = async () => {
  const count = await Products.estimatedDocumentCount();

  if (count === 0) {
    const created = await Products.create(Products.starterData);
    console.log(`${created.length} products created`);
  }
};

Products.initializer();
var _default = Products;
exports.default = _default;
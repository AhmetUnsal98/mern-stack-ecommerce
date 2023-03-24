import mongoose from "mongoose";

import nanoid from "../utils/nanoid";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ProductsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    size: {
      type: [String],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "TRY",
      enum: ["TRY", "USD", "EUR"],
    },
    stock: {
      type: Number,
      default: 1,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
      default: "PHYSICAL",
    },
  },

  {
    _id: true,
    collection: "products",
    timeStamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;

        return {
          ...ret,
        };
      },
    },
  }
);
const Products = mongoose.model("Products", ProductsSchema);
Products.starterData = [
  {
    _id: mongoose.Types.ObjectId("61d054e5a2f56187efb0a3b2"),
    name: "Dress Loungewear Green",
    title: "Dress Loungewear",
    desc: "Good a Loungewear",
    size: ["s", "m", "l"],
    color: "green",

    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/1664438299613Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg%20(1).png?alt=media&token=0a1c7da6-f672-412b-b531-da86880bbe18",

    categories: ["loungewear"],
    brand: "Versace",
    price: 10000,
    currency: "TRY",
    stock: 10,
    itemType: "PHYSICAL",
  },
  {
    _id: mongoose.Types.ObjectId("61d054e5a2f56187efb0a3c1"),
    name: "Dress Loungewear Red",
    title: "Dress Loungwear Red",
    desc: "Good Loungewear",
    size: ["s", "m", "l"],
    color: "red",

    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/1664438299613Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg%20(1).png?alt=media&token=0a1c7da6-f672-412b-b531-da86880bbe18",
    categories: ["loungewear"],
    brand: "Versace",
    price: 10000,
    currency: "TRY",
    stock: 10,
    itemType: "PHYSICAL",
  },
  {
    _id: mongoose.Types.ObjectId("61d054e5a2f56187efb0a3c5"),
    name: "Normal Tshirt Brown",
    title: "Normal Tshirt Brown",
    desc: "Good tshirt",
    size: ["s", "m", "l"],
    color: "black",

    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/1664438299613Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg%20(1).png?alt=media&token=0a1c7da6-f672-412b-b531-da86880bbe18",
    categories: ["tshirt"],
    brand: "Versace",
    price: 10000,
    currency: "TRY",
    stock: 10,
    itemType: "PHYSICAL",
  },
  {
    _id: mongoose.Types.ObjectId("61d054e5a2f56187efb0a3c9"),
    name: "Normal Tshirt",
    title: "Normal Tshirt",
    desc: "Good tshirt",
    size: ["s", "m", "l"],
    color: "black",

    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/1664438299613Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg%20(1).png?alt=media&token=0a1c7da6-f672-412b-b531-da86880bbe18",

    categories: ["tshirt"],
    brand: "Versace",
    price: 10000,
    currency: "TRY",
    stock: 10,
    itemType: "PHYSICAL",
  },
  {
    _id: mongoose.Types.ObjectId("61d054e5a2f56187efb0a3c0"),
    name: "Prada Jacket",
    title: "Prada Jacket Black",
    desc: "Good Jacket",
    size: ["s", "m", "l"],
    color: "black",

    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/1664438299613Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg%20(1).png?alt=media&token=0a1c7da6-f672-412b-b531-da86880bbe18",
    categories: ["jacket"],
    brand: "Prada",
    price: 10000,
    currency: "TRY",
    stock: 10,
    itemType: "PHYSICAL",
  },
  {
    _id: mongoose.Types.ObjectId("61d054e5a2f56187efb0a3c0"),
    name: "Light Jacket Black",
    title: "Prada Jacket Black",
    desc: "Good Jacket",
    size: ["s", "m", "l"],
    color: "black",

    image:
      "https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/1664438299613Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg%20(1).png?alt=media&token=0a1c7da6-f672-412b-b531-da86880bbe18",

    categories: ["jacket"],
    brand: "Prada",
    price: 10000,
    currency: "TRY",
    stock: 10,
    itemType: "PHYSICAL",
  },
];
Products.initializer = async () => {
  const count = await Products.estimatedDocumentCount();
  if (count === 0) {
    const created = await Products.create(Products.starterData);
    console.log(`${created.length} products created`);
  }
};
Products.initializer();

export default Products;

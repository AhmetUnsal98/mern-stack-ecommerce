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
      "https://img.freepik.com/free-photo/graphic-tshirt-trendy-design-mockup-presented-wooden-hanger_460848-13975.jpg?w=740&t=st=1679717554~exp=1679718154~hmac=f5c90139b84f1139decd7a9aa6e9664342471a35588ade914b94b5ff4302123e",

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
      "https://img.freepik.com/free-photo/trendy-top-design-mockup-presented-wooden-hanger_460848-13969.jpg?w=740&t=st=1679717519~exp=1679718119~hmac=6bdad59deb65653ea3938fb0d1fb703d81bbbcacf0f32ded3dec370a7277f75a",
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
      "https://img.freepik.com/free-psd/chromatees-tshirt-mockup_126278-25.jpg?w=996&t=st=1679717632~exp=1679718232~hmac=234b24a8a1847cdd76677c3baa84a9f61e70aaeaea9cacc18fc1dead016b8247",
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
      "https://img.freepik.com/free-photo/isolated-opened-black-t-shirt_125540-1451.jpg?w=900&t=st=1679717683~exp=1679718283~hmac=f9c3b6a0e2a1f0994d3a966dc6686811e657869e0c998d287a7f789119b3d801",

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
      "https://img.freepik.com/premium-photo/womens-red-leather-jacket-isolated-white-background_125604-212.jpg?w=740",
    categories: ["jacket"],
    brand: "Prada",
    price: 10000,
    currency: "TRY",
    stock: 10,
    itemType: "PHYSICAL",
  },
  {
    _id: mongoose.Types.ObjectId("61d054e5a2f56187efb0a3c0"),
    name: "Light White Jacket",
    title: "Prada Jacket Black",
    desc: "Good Jacket",
    size: ["s", "m", "l"],
    color: "white",

    image:
      "https://img.freepik.com/free-psd/white-jacket-floating-white_176382-1844.jpg?w=740&t=st=1679717936~exp=1679718536~hmac=49fa560baee55f4ba30ba07a2d86273d8b7c13429a5abd1b6c4f09d5f4769ef8",

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

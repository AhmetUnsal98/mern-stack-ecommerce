import mongoose from "mongoose";

import nanoid from "../utils/nanoid";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CategoriesSchema = new Schema(
  {
    uid: {
      type: String,
      default: nanoid(),
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
      default: "image",
    },
    isInHome: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
    collection: "categories",
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
const Categories = mongoose.model("Categories", CategoriesSchema);
Categories.starterData = [
  {
    uid: nanoid(),
    name: "Shirt Style",
    img: "https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/shirtCategory.jpg?alt=media&token=ddc5c6cf-4a1a-4f22-b1a2-76e2cc98ad1e",
    isInHome: true,
    category: "tshirt",
  },
  {
    uid: nanoid(),
    name: "Loungewear Love",
    img: "https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/loungewearCategory.jpg?alt=media&token=9b1a0874-9acf-4b06-8ecc-93a3621f50c4",
    isInHome: true,
    category: "loungewear",
  },
  {
    uid: nanoid(),
    name: "Lights Jackets",
    img: "https://firebasestorage.googleapis.com/v0/b/ecommerceadmin-80d08.appspot.com/o/lightjacketCategory.jpg?alt=media&token=4b7f85fc-5dbb-4d45-8999-11d492b5f261",
    isInHome: true,
    category: "jacket",
  },
];
Categories.initializer = async () => {
  const count = await Categories.estimatedDocumentCount();
  if (count === 0) {
    const created = await Categories.create(Categories.starterData);
    console.log(`${created.length} categories created`);
  }
};
Categories.initializer();
export default Categories;

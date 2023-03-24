"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _products = _interopRequireDefault(require("../db/products"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = router => {
  router.get("/products", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
      if (qNew) {
        products = await _products.default.find().sort({
          createdAt: -1
        }).limit(5);
      } else if (qCategory) {
        products = await _products.default.find({
          categories: {
            $in: [qCategory]
          }
        });
      } else {
        products = await _products.default.find();
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(res.statusCode.error);
    }
  });
  router.get("/products/find/:id", async (req, res) => {
    try {
      var id = req.params.id;
      _products.default.findById(id, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(docs);
        }
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
  router.get("/products/getAll", async (req, res) => {
    try {
      products = await _products.default.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
  router.get("/products/delete/:id", async (req, res) => {
    try {
      await _products.default.findByIdAndDelete(req.params.id);
      res.status(200).json("Product  has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  router.put("/products/update/:id", async (req, res) => {
    try {
      const updatedProduct = await _products.default.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {
        new: true
      });
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.post("/products/create", async (req, res) => {
    const newProduct = new _products.default(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
};
exports.default = _default;
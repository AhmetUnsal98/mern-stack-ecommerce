"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _products = _interopRequireDefault(require("../db/products"));

var _ApiError = _interopRequireDefault(require("../error/ApiError"));

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
};

exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _categories = _interopRequireDefault(require("../db/categories"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = router => {
  router.get("/categories", async (req, res) => {
    try {
      let categories;
      categories = await _categories.default.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  router.get("/categories/delete/:id", async (req, res) => {
    try {
      await _categories.default.findByIdAndDelete(req.params.id);
      res.status(200).json("Category  has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  router.post("/categories/create", async (req, res) => {
    const newCategory = new _categories.default(req.body);
    try {
      const savedCategory = await newCategory.save();
      res.status(200).json(savedCategory);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
};
exports.default = _default;
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
};

exports.default = _default;
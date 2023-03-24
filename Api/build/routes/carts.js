"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _carts = _interopRequireDefault(require("../db/carts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = router => {
  router.post("/carts", async (req, res) => {
    const newCart = new _carts.default(req.body);

    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

exports.default = _default;
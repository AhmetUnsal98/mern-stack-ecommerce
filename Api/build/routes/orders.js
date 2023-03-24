"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _orders = _interopRequireDefault(require("../db/orders"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require("./verifyToken");
var _default = router => {
  //Create a new Order
  router.post("/createOrder", verifyToken, async (req, res) => {
    const newOrder = new _orders.default(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Delete a order with id
  router.delete("/deleteOrder/:id", async (req, res) => {
    try {
      await _orders.default.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.put("/orders/update/:id", async (req, res) => {
    try {
      const updatedOrder = await _orders.default.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {
        new: true
      });
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Find User Orders
  router.get("/orders/find/:userId", async (req, res) => {
    try {
      const orders = await _orders.default.find({
        userId: req.params.userId
      });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Getl all Orders
  router.get("/orders", async (req, res) => {
    try {
      const orders = await _orders.default.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
};
exports.default = _default;
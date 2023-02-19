import Orders from "../db/orders";
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
export default (router) => {
  //Create a new Order
  router.post("/createOrder", verifyToken, async (req, res) => {
    const newOrder = new Orders(req.body);

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
      await Orders.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.put("/orders/update/:id", async (req, res) => {
    try {
      const updatedOrder = await Orders.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Find User Orders
  router.get("/orders/find/:userId", async (req, res) => {
    try {
      const orders = await Orders.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //Getl all Orders
  router.get("/orders", async (req, res) => {
    try {
      const orders = await Orders.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
};

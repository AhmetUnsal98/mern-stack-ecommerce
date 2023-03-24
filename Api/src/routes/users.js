import Users from "../db/users";

export default (router) => {
  router.get("/users", async (req, res) => {
    try {
      const users = await Users.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get("/users/delete/:id", async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

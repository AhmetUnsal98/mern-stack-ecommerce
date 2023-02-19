import Categories from "../db/categories";

export default (router) => {
  router.get("/categories", async (req, res) => {
    try {
      let categories;
      categories = await Categories.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.get("/categories/delete/:id", async (req, res) => {
    try {
      await Categories.findByIdAndDelete(req.params.id);
      res.status(200).json("Category  has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  router.post("/categories/create", async (req, res) => {
    const newCategory = new Categories(req.body);
    try {
      const savedCategory = await newCategory.save();
      res.status(200).json(savedCategory);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });
};

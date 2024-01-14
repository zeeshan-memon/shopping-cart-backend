const controller = require("../controllers/prodducts");

module.exports = (router) => {
  router
    .route("/products/:id?")
    .get(controller.get)
    .post(controller.create)
    .put(controller.update)
    .delete(controller.delete);

  router.get("/products/category/:category", controller.getProductsByCategory);
  router.get("/get/categories", controller.getCategories);

};

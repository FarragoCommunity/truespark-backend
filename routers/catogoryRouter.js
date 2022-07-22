const router = require("express").Router();
const categoryController = require("../controllers/catogaryController");
const {verifyAdminToken} = require("../controllers/adminController");

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(verifyAdminToken,categoryController.createCategory);
router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .patch(verifyAdminToken,categoryController.updateCategoryById)
  .delete(verifyAdminToken,categoryController.deleteCategoryById); // delete the category

module.exports = router;
  

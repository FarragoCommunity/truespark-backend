const router = require("express").Router();
const articleController = require("../controllers/articleController");
const { verifyToken } = require("../controllers/userController");
const { verifyAdminToken } = require("../controllers/adminController");

router
  .route("/")
  .get(articleController.getAllBlogs)
  .post(verifyAdminToken,articleController.createBlog);
router
  .route('/recent')
  .get(articleController.getRecentBlogs)
router
  .route("/:id")
  .get(articleController.getBlogById)
  .patch(verifyAdminToken,articleController.updateBlogById)
  .delete(verifyAdminToken,articleController.deleteBlogById);
router.get("/category/:id", articleController.getBlogsByCategory);
router.get("/find-exeption/:categoryId/:blogId",articleController.findExeptMe);
// get all comments of an article
router.get("/:id/comments", articleController.getComments);
// like a blog
router.patch("/:id/like",verifyToken,articleController.addLike);
// dislike a blog
router.patch("/:id/dislike",verifyToken,articleController.dislike);

module.exports = router;

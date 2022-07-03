const router = require("express").Router();
const userController = require("../controllers/userController");

router.get('/', userController.getUser);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/checkLoggedIn", userController.checkLoggedIn);
router.post("/logout", userController.logout);

module.exports = router;

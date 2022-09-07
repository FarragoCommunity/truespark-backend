const router = require("express").Router();
const userController = require("../controllers/userController");
const {verifyAdminToken} = require("../controllers/adminController");

router.get('/:id',userController.findUserById);
router.post('/',verifyAdminToken,userController.getUser);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/checkLoggedIn", userController.checkLoggedIn);
router.post("/logout", userController.logout);
router.post("/loginwithgoogle", userController.googleLogin);

module.exports = router;

const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.post('/login',adminController.adminLogin);
router.post('/checkAdminLoggedIn',adminController.checkAdminLoggedIn);
router.post('/logout',adminController.adminLogout);

module.exports = router;

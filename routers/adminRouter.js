const router = require('express').Router();
const adminController = require('../controllers/adminController');

router.post('/login',adminController.adminLogin);
router.get('/checkAdminLoggedIn',adminController.checkAdminLoggedIn);

module.exports = router;

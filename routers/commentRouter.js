const router = require('express').Router()
const commentController = require('../controllers/commentController')
const { verifyToken } = require("../controllers/userController");

router.post('/',commentController.addComment);
router.get('/:id',commentController.getCommentById)
router.delete('/:id',commentController.deleteComment)

module.exports = router;

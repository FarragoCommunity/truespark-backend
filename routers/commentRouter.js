const router = require('express').Router()
const commentController = require('../controllers/commentController')
const { verifyToken } = require("../controllers/userController");

router.post('/',verifyToken,commentController.addComment);
router.get('/:id',commentController.getCommentById)
router.delete('/:id',verifyToken,commentController.deleteComment)

module.exports = router;

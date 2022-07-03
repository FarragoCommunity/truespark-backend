const Comment = require("../models/commentModel");

// add a comment to an article
exports.addComment = async (req, res) => {
    let message;
    console.log(req.body);
    if (!req.body.content) {
        message = "Content is required";
    } else if (!req.body.article) {
        message = "Article is required";
    }
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json({
        comment,
        success: true,
        });
    } catch (error) {
        res.status(400).json({
        error,
        success: false,
        message,
        });
    }
    }

    // get a comment by id
    exports.getCommentById = async (req, res) => {
        try {
            // find comment by id
            const comment = await Comment.findById(req.params.id)
            .populate("article", "title");
            res.status(200).json({
            comment,
            success: true,
            });
        } catch (error) {
            res.status(400).json({
            error,
            success: false,
            });
        }
    }

    // delete a comment
    exports.deleteComment = async (req, res) => {
        try {
            // find comment by id
            const comment = await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json({
            comment,
            success: true,
            });
        } catch (error) {
            res.status(400).json({
            error,
            success: false,
            });
        }
    }
const Comment = require("../models/commentModel");

// add a comment to an article
exports.addComment = async (req, res) => {
    // checking there have jwt in localstorage or not
    if (!req.body.jwt){
        return res.status(401).json({
            message: "Please provide jwt",
        });
    }
    let message;
    // checking is comment there or not
    if (!req.body.content) {
        message = "Content is required";
    } else if (!req.body.article) {
        message = "Article is required";
    }
    try {
        const comment = await Comment.create({
            content : req.body.content,
            createdBy : req.body.createdBy,
            article : req.body.article,
        });
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
        // checking there have jwt in localstorage or not
        if (!req.body.jwt){
            return res.status(401).json({
                message: "Please provide jwt",
            });
        }
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
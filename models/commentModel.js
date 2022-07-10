const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        article: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        },
    },
    {
        timestamps: true,
    }
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment   

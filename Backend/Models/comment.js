const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Post"
    },
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [3, " Please type at least 3 characters"]
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    likeCount: {
        type: Number,
        default: 0
    },
    star: {
        type: Number,
        default: 0
    }


}, { timestamps: true })


const Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment;
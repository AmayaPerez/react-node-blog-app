
const mongoose = require("mongoose")
const Comment = require("./comment")
const slugify = require("slugify")

const PostSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    slug: String,
    title: {
        type: String,
        required: [true, "Please provide a title"],
        unique: true,
        minlength: [4, "Please type at least 4 characters"],
    },
    content: {
        type: String,
        required: [true, "Please provide a content "],
        minlength: [10, "Please type at least 10 characters"],
    },
    image: {
        type: String,
        default: "default.jpg"
    },
    readtime: {
        type: Number,
        default: 3
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    likeCount: {
        type: Number,
        default: 0
    },
    comments: [{
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
    }],
    commentCount: {
        type: Number,
        default: 0
    }


}, { timestamps: true })

PostSchema.pre("save",  function (next) {

    if (!this.isModified("title")) {
        next();
    }


    this.slug = this.makeSlug()

    next()

})

PostSchema.pre("remove", async function (next) {

    const post= await Post.findById(this._id)

    await Comment.deleteMany({
        post : post 
    })

})

PostSchema.methods.makeSlug = function () {
    return slugify(this.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@/?]/g,
        lower: true,
        strict: false,
        locale: 'tr',
        trim: true
    })

}

const Post = mongoose.model("Post", PostSchema)

module.exports = Post;
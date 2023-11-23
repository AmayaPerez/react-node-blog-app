const express = require("express")

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");

const { addNewCommentToPost ,getAllCommentByPost,commentLike ,getCommentLikeStatus} = require("../Controllers/comment")

const { checkPostExist } = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router() ;


router.post("/:slug/addComment",[getAccessToRoute,checkPostExist] ,addNewCommentToPost)

router.get("/:slug/getAllComment",getAllCommentByPost)

router.post("/:comment_id/like",commentLike)

router.post("/:comment_id/getCommentLikeStatus",getCommentLikeStatus)


module.exports = router
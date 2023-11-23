const express = require("express")
const imageupload = require("../Helpers/Libraries/imageUpload");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth");
const {addPost,getAllPosts,detailPost,likePost, editPost, deletePost, editPostPage } = require("../Controllers/post")
const { checkPostExist, checkUserAndPostExist } = require("../Middlewares/database/databaseErrorhandler");

const router = express.Router() ;

router.post("/addpost" ,[getAccessToRoute, imageupload.single("image")],addPost)


router.post("/:slug", checkPostExist, detailPost)

router.post("/:slug/like",[getAccessToRoute,checkPostExist] ,likePost)

router.get("/editPost/:slug",[getAccessToRoute,checkPostExist,checkUserAndPostExist] , editPostPage)

router.put("/:slug/edit",[getAccessToRoute,checkPostExist,checkUserAndPostExist, imageupload.single("image")], editPost)

router.delete("/:slug/delete",[getAccessToRoute,checkPostExist,checkUserAndPostExist], deletePost)

router.get("/getAllPosts",getAllPosts)


module.exports = router
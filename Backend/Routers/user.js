const express = require("express")

const imageUpload = require("../Helpers/Libraries/imageUpload");

const {profile,editProfile,changePassword,addPostToReadList,readListPage} = require("../Controllers/user");
const { getAccessToRoute } = require("../Middlewares/Authorization/auth");


const router = express.Router() ;

router.get("/profile",getAccessToRoute, profile)

router.post("/editProfile",[getAccessToRoute, imageUpload.single("photo")],editProfile)

router.put("/changePassword",getAccessToRoute, changePassword)

router.post("/:slug/addPostToReadList",getAccessToRoute ,addPostToReadList)

router.get("/readList",getAccessToRoute ,readListPage)



module.exports = router
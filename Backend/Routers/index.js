const express = require("express")

const router = express.Router()

const authRoute = require("./auth")
const postRoute = require("./post")
const userRoute = require("./user")
const commentRoute = require("./comment")

router.use("/auth", authRoute)
router.use("/post", postRoute)
router.use("/user", userRoute)
router.use("/comment", commentRoute)


module.exports = router
const asyncErrorWrapper = require("express-async-handler")
const CustomError = require("../../Helpers/error/CustomError");
const Post = require("../../Models/post")


const checkPostExist = asyncErrorWrapper(async (req,res,next) => {
  
    const {slug} = req.params  ;
    const post = await Post.findOne({
      slug : slug
    })

    if(!post) {
        return next(new CustomError("The slug doesn't match with any post",400))
    }

    next() ; 

})


const checkUserAndPostExist = asyncErrorWrapper(async(req, res, next) => {

    const {slug} =req.params 

    const post = await Post.findOne({
        slug : slug ,
        author :req.user 
    })

    if (!post ) {
        return next(new CustomError("The slug doesn't match with any post and user ",400))
    }

    next() ; 

})

module.exports ={
    checkPostExist,
    checkUserAndPostExist
}

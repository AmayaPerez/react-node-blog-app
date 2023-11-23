const asyncErrorWrapper = require("express-async-handler")
const Post = require("../Models/post");
const deleteImageFile = require("../Helpers/Libraries/deleteImageFile");
const {searchHelper, paginateHelper} =require("../Helpers/query/queryHelpers")

const addPost = asyncErrorWrapper(async  (req,res,next)=> {

    const {title,content} = req.body 

    var wordCount = content.trim().split(/\s+/).length ; 
   
    let readtime = Math.floor(wordCount /200)   ;


    try {
        const newPost = await Post.create({
            title,
            content,
            author :req.user._id ,
            image : req.savedPostImage,
            readtime
        })

        return res.status(200).json({
            success :true ,
            message : "Post successfully added!",
            data: newPost
        })
    }

    catch(error) {

        deleteImageFile(req)

        return next(error)
        
    }
  
})

const getAllPosts = asyncErrorWrapper( async (req,res,next) =>{

    let query = Post.find();

    query =searchHelper("title",query,req)

    const paginationResult =await paginateHelper(Post , query ,req)

    query = paginationResult.query  ;

    query = query.sort("-likeCount -commentCount -createdAt")

    const posts = await query
    
    return res.status(200).json(
        {
            success:true,
            count : posts.length,
            data : posts ,
            page : paginationResult.page ,
            pages : paginationResult.pages
        })

})

const detailPost =asyncErrorWrapper(async(req,res,next)=>{

    const {slug}=req.params ;
    const {activeUser} =req.body 

    const post = await Post.findOne({
        slug: slug 
    }).populate("author likes")

    const postLikeUserIds = post.likes.map(json => json.id)
    const likeStatus = postLikeUserIds.includes(activeUser._id)


    return res.status(200).
        json({
            success:true,
            data : post,
            likeStatus:likeStatus
        })

})

const likePost =asyncErrorWrapper(async(req,res,next)=>{

    const {activeUser} =req.body 
    const {slug} = req.params ;

    const post = await Post.findOne({
        slug: slug 
    }).populate("author likes")
   
    const postLikeUserIds = post.likes.map(json => json._id.toString())
   
    if (! postLikeUserIds.includes(activeUser._id)){

        post.likes.push(activeUser)
        post.likeCount = post.likes.length
        await post.save() ; 
    }
    else {

        const index = postLikeUserIds.indexOf(activeUser._id)
        post.likes.splice(index,1)
        post.likeCount = post.likes.length

        await post.save() ; 
    }
 
    return res.status(200).
    json({
        success:true,
        data : post
    })

})

const editPostPage  =asyncErrorWrapper(async(req,res,next)=>{
    const {slug } = req.params ; 
   
    const post = await Post.findOne({
        slug: slug 
    }).populate("author likes")

    return res.status(200).
        json({
            success:true,
            data : post
    })

})


const editPost  =asyncErrorWrapper(async(req,res,next)=>{
    const {slug } = req.params ; 
    const {title ,content ,image ,previousImage } = req.body;

    const post = await Post.findOne({slug : slug })

    post.title = title ;
    post.content = content ;
    post.image =   req.savedPostImage ;

    if( !req.savedPostImage) {
        post.image = image
    }
    else {
       
       deleteImageFile(req,previousImage)

    }

    await post.save()  ;

    return res.status(200).
        json({
            success:true,
            data :post
    })

})

const deletePost  =asyncErrorWrapper(async(req,res,next)=>{

    const {slug} = req.params  ;

    const post = await Post.findOne({slug : slug })

    deleteImageFile(req,post.image) ; 

    await post.remove()

    return res.status(200).
        json({
            success:true,
            message : "Post delete succesfully "
    })

})


module.exports ={
    addPost,
    getAllPosts,
    detailPost,
    likePost,
    editPostPage,
    editPost ,
    deletePost
}
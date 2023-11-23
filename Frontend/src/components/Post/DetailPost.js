import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "../../Css/DetailPost.css"
import Loader from '../General/Loader';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit, FiArrowLeft } from 'react-icons/fi'
import { FaRegComment } from 'react-icons/fa'
import { BsBookmarkPlus, BsThreeDots, BsBookmarkFill } from 'react-icons/bs'
import CommentSidebar from '../Comment/CommentSidebar';

const DetailPost = () => {
  const [likeStatus, setLikeStatus] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [activeUser, setActiveUser] = useState({})
  const [post, setPost] = useState({})
  const [postLikeUser, setPostLikeUser] = useState([])
  const [sidebarShowStatus, setSidebarShowStatus] = useState(false)
  const [loading, setLoading] = useState(true)
  const slug = useParams().slug
  const [postReadListStatus, setPostReadListStatus] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    const getDetailPost = async () => {
      setLoading(true)
      var activeUser = {}
      try {
        const { data } = await axios.get("/auth/private", {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        activeUser = data.user

        setActiveUser(activeUser)

      }
      catch (error) {
        setActiveUser({})
      }

      try {
        const { data } = await axios.post(`/post/${slug}`, { activeUser })
        setPost(data.data)
        setLikeStatus(data.likeStatus)
        setLikeCount(data.data.likeCount)
        setPostLikeUser(data.data.likes)
        setLoading(false)

        const post_id = data.data._id;

        if (activeUser.readList) {

          if (!activeUser.readList.includes(post_id)) {
            setPostReadListStatus(false)
          }
          else {
            setPostReadListStatus(true)

          }

        }

      }
      catch (error) {
        setPost({})
        navigate("/not-found")
      }

    }
    getDetailPost();

  }, [slug, setLoading])



  const handleLike = async () => {
    setTimeout(() => {
      setLikeStatus(!likeStatus)
    }, 1500)

    try {
      const { data } = await axios.post(`/post/${slug}/like`, { activeUser }, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })

      setLikeCount(data.data.likeCount)
      setPostLikeUser(data.data.likes)

    }
    catch (error) {
      setPost({})
      localStorage.removeItem("authToken")
      navigate("/")
    }

  }

  const handleDelete = async () => {

    if (window.confirm("Do you want to delete this post?")) {

      try {

        await axios.delete(`/post/${slug}/delete`, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        })
        navigate("/")

      }
      catch (error) {
        console.log(error)
      }

    }

  }


  const editDate = (createdAt) => {

    const d = new Date(createdAt)
      ;
    var datestring = d.toLocaleString('eng', { month: 'long' }).substring(0, 3) + " " + d.getDate()
    return datestring
  }

  const addPostToReadList = async () => {

    try {

      const { data } = await axios.post(`/user/${slug}/addPostToReadList`, { activeUser }, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })

      setPostReadListStatus(data.status)

      document.getElementById("readListLength").textContent = data.user.readListLength
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {
        loading ? <Loader /> :
          <>

            <div className='Inclusive-detailPost-page'>

              <div className="top_detail_wrapper">
                <Link to={'/'} >
                  <FiArrowLeft />
                </Link>
                <h5>{post.title}</h5>

                <div className='post-general-info'>

                  <ul>
                    {post.author &&
                      <li className='post-author-info'>
                        <img src={`/userPhotos/${post.author.photo}`} alt={post.author.username} />
                        <span className='post-author-username'>{post.author.username}  </span>
                      </li>
                    }
                    <li className='post-createdAt'>
                      {
                        editDate(post.createdAt)
                      }
                    </li>
                    <b>-</b>

                    <li className='post-readtime'>
                      {post.readtime} min read

                    </li>

                  </ul>

                  {
                    !activeUser.username &&
                    <div className='comment-info-wrap'>

                      <i onClick={(prev) => {
                        setSidebarShowStatus(!sidebarShowStatus)
                      }}>
                        <FaRegComment />
                      </i>


                      <b className='commentCount'>{post.commentCount}</b>

                    </div>
                  }

                  {activeUser && post.author &&
                    post.author._id === activeUser._id ?
                    <div className="top_post_transactions">
                      <Link className='editPostLink' to={`/post/${post.slug}/edit`}>
                        <FiEdit />
                      </Link>
                      <span className='deletePostLink' onClick={handleDelete}>
                        <RiDeleteBin6Line />
                      </span>
                    </div> : null
                  }
                </div>

              </div>

              <div className="CommentFieldEmp">

                <CommentSidebar slug={slug} sidebarShowStatus={sidebarShowStatus} setSidebarShowStatus={setSidebarShowStatus}
                  activeUser={activeUser}
                />

              </div>

              <div className='post-content' >

                <div className="post-banner-img">
                  <img src={`/public/postImages/${post.image}`} alt={post.title} />

                </div>

                <div className='content' dangerouslySetInnerHTML={{ __html: (post.content) }}>
                </div>

              </div>

              {activeUser.username &&
                <div className='fixed-post-options'>

                  <ul>
                    <li>

                      <i onClick={handleLike} >

                        {likeStatus ? <FaHeart color="#0063a5" /> :
                          <FaRegHeart />
                        }
                      </i>

                      <b className='likecount'
                        style={likeStatus ? { color: "#0063a5" } : { color: "rgb(99, 99, 99)" }}
                      >  {likeCount}
                      </b>

                    </li>


                    <li>
                      <i onClick={(prev) => {
                        setSidebarShowStatus(!sidebarShowStatus)
                      }}>
                        <FaRegComment />
                      </i>

                      <b className='commentCount'>{post.commentCount}</b>

                    </li>

                  </ul>

                  <ul>
                    <li>
                      <i onClick={addPostToReadList}>

                        {postReadListStatus ? <BsBookmarkFill color='#0205b1' /> :
                          <BsBookmarkPlus />
                        }
                      </i>
                    </li>
{/* 
                    <li className='BsThreeDots_opt'>
                      <i  >
                        <BsThreeDots />
                      </i>

                      {activeUser &&
                        post.author._id === activeUser._id ?
                        <div className="delete_or_edit_post  ">
                          <Link className='editPostLink' to={`/post/${post.slug}/edit`}>
                            <p>Edit Post</p>
                          </Link>
                          <div className='deletePostLink' onClick={handleDelete}>
                            <p>Delete Post</p>
                          </div>
                        </div> : null
                      }

                    </li> */}

                  </ul>

                </div>
              }

            </div>
          </>
      }
    </>
  )
}

export default DetailPost;

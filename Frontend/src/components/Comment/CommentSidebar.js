import React, { useState, useEffect, useRef } from 'react';
import PostComments from './PostComments';
import axios from 'axios';
import AddComment from './AddComment';

const CommentSidebar = ({ slug, sidebarShowStatus, setSidebarShowStatus, activeUser }) => {

  const [count, setCount] = useState(0)
  const [commentlist, setCommentList] = useState([])

  const sidebarRef = useRef(null);

  useEffect(() => {
    getPostComments()
  }, [setCommentList])


  const getPostComments = async () => {
    try {
      const { data } = await axios.get(`/comment/${slug}/getAllComment`)
      setCommentList(data.data)
      setCount(data.count)
    }
    catch (error) {
      console.log(error.response.data.error);
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {

      if (sidebarShowStatus && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarShowStatus(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [sidebarShowStatus])



  return (

    <div ref={sidebarRef} className={sidebarShowStatus ? "Inclusive-comment-sidebar visible" : "Inclusive-comment-sidebar hidden "}  >

      <div className='sidebar-wrapper'>

        <AddComment setSidebarShowStatus={setSidebarShowStatus} slug={slug} getPostComments={getPostComments} activeUser={activeUser} count={count} />

        <PostComments commentlist={commentlist} activeUser={activeUser} count={count} />
      </div>

    </div>

  )
}

export default CommentSidebar;

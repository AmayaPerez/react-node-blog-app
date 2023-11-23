import React from 'react';
import CommentItem from './CommentItem';
import '../../Css/PostComments.css'

const PostComments = ({ commentlist, count, activeUser }) => {

    return (
        <>
            {count !== 0 ?
                <div className='postComments'>
                    <h5>MOST RELEVANT</h5>
                    <div className="comment-Wrapper">
                        {
                            commentlist.map((comment) => {
                                return (
                                    <CommentItem key={comment._id} comment={comment} activeUser={activeUser} />
                                )
                            })
                        }
                    </div>

                </div> :
                <div className='no-response'>There are not comment for this post.
                    Be the first! </div>
            }
        </>
    )
}

export default PostComments;

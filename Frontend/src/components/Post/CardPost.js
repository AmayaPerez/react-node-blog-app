import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {

    const editDate = (createdAt) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        const d = new Date(createdAt);
        var datestring = d.getDate() + " " +monthNames[d.getMonth()] + " ," + d.getFullYear() 
        return datestring
    }

    const truncateContent = (content) => {
        const trimmedString = content.substr(0, 73);
        return trimmedString
    }
    const truncateTitle= (title) => {
        const trimmedString = title.substr(0, 69);
        return trimmedString
    }
    
    return (

        <div className="post-card">
            <Link to={`/post/${post.slug}`} className="post-link">

                <img className=" post-image" src={`/postImages/${post.image}`} alt={post.title} />
                <div className="post-content-wrapper">

                    <h5 className="post-title">
                        
                    {post.title.length > 76 ? truncateTitle(post.title)+"..." : post.title
                    
                    }
                    </h5>


                    <p className="post-text"dangerouslySetInnerHTML={{__html : truncateContent( post.content) +"..."}}>
                        </p>
                    <p className="post-createdAt">{editDate(post.createdAt)} 
                    </p>
                </div>
            </Link>
        </div>

    )
}

export default Post;

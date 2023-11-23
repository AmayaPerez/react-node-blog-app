import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsThreeDots, BsBookmarkFill } from 'react-icons/bs'

const ReadListPostItem = ({ post, editDate }) => {

    const truncateContent = (content) => {
        const trimmedString = content.substr(0, 130);
        return trimmedString
    }

    return (

        <div className="readList-post-item">

            <section>
                <div className="post-top-block">
                    <div className="readList-post-author">

                        {post.author.username}

                    </div>
                    <span>-</span>
                    <div className="readList-post-createdAt">
                        {editDate(post.createdAt)}
                    </div>
                    <i>
                        <AiFillStar />
                    </i>

                </div>

                <div className="post-med-block">
                    <div className="readList-post-title">
                        <a href={`post/${post.slug}`}>
                            {post.title}
                        </a>
                    </div>
                    <div className="readList-post-content">

                        <span dangerouslySetInnerHTML={{ __html: truncateContent(post.content) + "..." }}></span>

                    </div>

                </div>

                <div className="post-bottom-block">
                    <a href={`post/${post.slug}`}>
                        <span>
                            Read More
                        </span>
                        <span>
                            -
                        </span>
                        <span>
                            {post.readtime} min read
                        </span>
                    </a>

                    <div>

                        <i>
                            <BsBookmarkFill />
                        </i>
                        <i>
                            < BsThreeDots />
                        </i>

                    </div>
                </div>
            </section>

            <section>
                <div className="post-Image-Wrap">
                    <img src={`/public/postImages/${post.image}`} alt={post.title} width="180px" />
                </div>

            </section>

        </div>
    )
}

export default ReadListPostItem
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import { Delete } from '@mui/icons-material'
import axios from 'axios'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Post = ({ post }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user:currentUser} = useContext(AuthContext)
    // console.log('postttttttttttttttttttttttt: ',post)

    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})

    const likeHandler = () => {
        try {
            axios.put(`/posts/${post._id}/like`, {userId: currentUser._id})
        } catch (err) {
            console.log('error like', err)
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    useEffect(()=> {
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            console.log('fetch user',res.data)
            setUser(res.data)
        }
        fetchUsers()
    }, [post.userId])

   
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`} style={{ textDecoration: 'none', color: 'none' }} >
                            <img 
                            src={user.profilePic ? PF + user.profilePic : PF+"person/Yamato.jpg"} 
                            alt="" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">
                            {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <Delete />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span> 
                    <img className='postImg' src={PF+post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${PF}/love-svgrepo-com.svg`} alt="" className="likeIcon" onClick={likeHandler} />
                        <img src={`${PF}/thumb-up-svgrepo-com.svg`} alt="" className="likeIcon" onClick={likeHandler} />
                        <span className="postLikeCounter">{like} poeple like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
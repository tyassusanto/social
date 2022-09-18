import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './chatonline.css'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`/users/friends/${currentId}`)
            setFriends(res.data)
        }
        getFriends()
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter(fr => onlineUsers.includes(fr._id)))
    }, [friends, onlineUsers])

    // console.log('onlineUsers: ', onlineUsers)

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`)
            setCurrentChat(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='chatOnline'>
            {onlineFriends.map((o) => (
                <div className="chatOnlineFriend" onClick={() => handleClick(o)}> 
                    <div className="chatOnlineImgContainer">
                        <img className='chatOnlineImg' src={o?.profilePic ? PF+o.profilePic : PF+'person/Yamato.jpg'} alt="" />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o?.username}</span>
                </div>
            ))}
        </div>
    )
}

export default ChatOnline
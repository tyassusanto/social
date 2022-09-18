import React from 'react'
import './friends.css'

const Friends = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="sidebarFriend">
            {/* BELUM DINAMIS */}
            <img src={PF+user.profilePic} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    )
}

export default Friends
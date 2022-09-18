import React from 'react'
import './online.css'

const Online = ({user}) => {
    // props user dari data dummy
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <li className="rightbarFriend">
            <div className="righrbarProfileImgContainer">
                {/* BELUM DINAMIS */}
                <img src={PF+user.profilePic} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}

export default Online
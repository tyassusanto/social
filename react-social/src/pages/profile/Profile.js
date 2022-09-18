import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import './profile.css'
import {useParams} from 'react-router-dom'

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})
    const username = useParams().username
    // console.log(params)

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`/users?username=${username}`)
            // console.log('fetch post',res)
            setUser(res.data)
        }
        fetchUsers()
    }, [username])

    return (
        <div>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className='profileCoverImg' src={user.coverPic ? PF+user.coverPic : PF+'/person/Yamato.webp'} alt="" />
                            <img className='profileUserImg' src={user.profilePic ? PF+user.profilePic : PF+'/person/yamato.jpg'} alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
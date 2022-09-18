/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import './rightbar.css'
import { Users } from '../../dummyData'
import Online from '../online/Online'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Add, Remove } from '@mui/icons-material'

// FOLLOW BUTTON MASIH BUG

const Rightbar = ({ user }) => {
  // props user dari dummy data
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setFriends] = useState([])
  const {user: currentUser, dispatch} = useContext(AuthContext)
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id))
  // const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id))
  // console.log('current User : ', currentUser.followings)
  useEffect(()=>{
    setFollowed(currentUser.followings.includes(user?._id))
    // setFollowed(currentUser.followings.includes(user?.id))
  },[currentUser, user?._id])
  // },[currentUser, user.id])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get('/users/friends/' + user._id)
        setFriends(friendList.data)
      } catch (err) {
        console.log('err fetch friend rightbar', err)
      }
    }
    getFriends()
  }, [user])

  const handleClick = async () => {
    try {
      if(followed){
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id
        })
        dispatch({type:'UNFOLLOW', payload: user._id})
      }else{
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id
        })
        dispatch({type:'FOLLOW', payload: user._id})
      }
    } catch (err) {
      console.log(err)
    }
    setFollowed(!followed)
  }

  const HomeRightbar = () => {

    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift-svgrepo-com.svg" alt="" className="birthdayImg" />
          <span className="birthText"><b>Nina</b> and <b>3 other friends</b> are birthday today</span>
        </div>
        <img src="assets/download.jpg" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? 'Unfollow' : 'Follow'}
          {followed ? <Remove/> : <Add/>}
        </button>
      )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City : </span>
            <span className="rightbarInfoValue">{user.city ? user.city : '-'}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From : </span>
            <span className="rightbarInfoValue">{user.from ? user.from : '-'}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship : </span>
            <span className="rightbarInfoValue">{
              user.relationship === 1 ? 'Single'
                : user.relationship === 2 ? 'Married'
                  : '-'}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link style={{textDecoration:'none'}} to={`/profile/${friend.username}`}>
              <div className="rightbarFollowing">
                {/* FOTO BELUM DINAMIS */}
                <img src={`${PF}/person/hancock.webp`} alt="" className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
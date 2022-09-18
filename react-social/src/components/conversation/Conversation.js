import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './conversation.css'

const Conversation = ({conversation, currentUser}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState(null)
    
    useEffect(() => {
      const friendId = conversation.members.find(m=>m !== currentUser._id)

      const getUser = async () => {
        try {
          const res = await axios(`/users?userId=${friendId}`)
          setUser(res.data)
        } catch (err) {
          console.log('error get user conversation page', err)
        }
      }
      getUser()
    }, [currentUser, conversation])

  return (
    <div className='conversation'>
        <img className='conversationImg' src={user?.profilePic ? user.profilePic :  PF+"person/Yamato.jpg"} alt="" />
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}

export default Conversation
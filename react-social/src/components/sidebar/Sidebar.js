import React from 'react'
import './sidebar.css'
import { Bookmark, Chat, Event, Group, HelpOutline, Logout, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from '@mui/icons-material'
import {Users} from '../../dummyData'
import Friends from '../friends/Friends'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate()
  
  const handleLogut = () => {
    localStorage.clear()
    navigate('/login')
  }
  const moveToChat = () => {
    navigate('/messenger')
  }

  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className='sidebarIcon'/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem hoveIcon" onClick={moveToChat}>
            <Chat className='sidebarIcon'  />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className='sidebarIcon'/>
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className='sidebarIcon'/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className='sidebarIcon'/>
            <span className="sidebarListItemText">Bookmark</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className='sidebarIcon'/>
            <span className="sidebarListItemText">Question</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className='sidebarIcon'/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className='sidebarIcon'/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className='sidebarIcon'/>
            <span className="sidebarListItemText">Courses</span>
          </li>
          <li className="sidebarListItem hoveIcon" onClick={handleLogut}>
            <Logout className='sidebarIcon' />
            <span className="sidebarListItemText">Log Out</span>
          </li>
        </ul>
        {/* <button className="sidebarButton">Show More</button> */}
        <hr className='sidebarHr'/>
        <ul className="sidebarFriendList">
          {Users.map((u)=>(
            <Friends key={u._id} user={u}/>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
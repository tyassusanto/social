import './topbar.css'
import React, { useContext } from 'react'
import { Person, Search, Chat, Notifications } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Topbar = () => {
  const { user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className="logo">MySocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className='searchIcon' />
          <input placeholder='search friends' className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <div className="topbarLink">Homepage</div>
          <div className="topbarLink">Timeline</div>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to={`/messenger`} style={{color:'white'}}>
            <Chat />
              <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={user.profilePic ? PF + user.profilePic : PF + 'person/yamato.jpg'} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  )
}

export default Topbar
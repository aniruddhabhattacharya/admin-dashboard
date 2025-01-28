import React from 'react'
import "./css/Header.css"
function Header() {
  return (
    <div className='header-bar'>
      <div className="name-left">
        <img src="https://cdn-icons-png.freepik.com/512/9703/9703596.png" alt="" className='img' style={{marginTop: "-15px"}} />
        <p className='admin-console'>Admin Console</p>
        <p className='admin-view'>Admin View</p>
      </div>
      <div className="icons-right">
        <p className='support' style={{display: "flex", alignItems: "center", gap: "5px"}}>
            <span className="material-symbols-outlined">
                support
            </span>
            Support</p>
        <div className="user">
            <img src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg" className='img' alt="" />
            <span>Jane</span>
        </div>
      </div>
    </div>
  )
}

export default Header

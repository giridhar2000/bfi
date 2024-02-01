import "../Navbar/Navbar.css"
import React from 'react'
import bfilogo from "../../Assets/images/bfilogo.png"
import { SearchOutlined, BellOutlined, DownOutlined, PlusCircleOutlined } from '@ant-design/icons';
import user from "../../Assets/images/user.png"
import downarrow from "../../Assets/images/downarrow.png"
import { NavLink } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={bfilogo} alt="bfi-logo-img" className="bfi-icon" />
      </div>
      <div className="menu">
        <div className="searchbar">
          <input type="text" placeholder="Search anything..." />
          <SearchOutlined className="searchicon" />
        </div>
        <div className="icons">
          <BellOutlined className="bellicon" />
          <NavLink to='/add'><PlusCircleOutlined className="bellicon" /></NavLink>
        </div>
        <div className="user">
          <img src={user} alt="user-logo" className="userimg" />
          <img src={downarrow} alt="bfi-logo-img" className="downicon" />

        </div>

      </div>
    </div>
  )
}

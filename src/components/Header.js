import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate ,Link} from 'react-router-dom';
import '../css/Header.css'

export default function Header() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.removeItem("token");
    navigate("/user-login");
  }
  return (
    <div className='head-cont'>
      <img  src={logo} />
      {token != null ? <button className='logout-btn' onClick={onLogOut}>Logout</button>: 
        <div>
          <button className='logout-btn biz' onClick={() => navigate("/business-login")}>Biz Login</button>
          <button className='logout-btn' onClick={() => navigate("/user-login")}>Login</button>
          </div>
      }   
    </div>
  )
}

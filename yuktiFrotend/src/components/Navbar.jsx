import React,{useState} from 'react'
import logoImage from "../assets/logo1.png"
import { Link } from 'react-router-dom'
//import {useSelector} from "react-redux"



const Navbar=()=>{
  //const {isAuthenticated}=useSelector((state)=>state.user)

  return (
    <>


   <nav className="navbar">
   <div className="logo">
      <Link to="/"><img src={logoImage} alt="logo" className='logo-img'/></Link>
      <div className=""></div>
    </div>
    <div>
    <ul className="nav-links ">
       <Link to="/" className='nav-link'>
       <li className='nav-items '>Home</li>
       </Link>
       <Link to="/About" className='nav-link'>
       <li  className='nav-items'>About</li>
       </Link>
       <Link to="/dashboard" className='nav-link'>
       <li  className='nav-items'>Dashboard</li>
       </Link>
      
      </ul>
    </div>
  
      <div className="cta">
      <Link to="/login">
            <button className="cta-btn">
            Sign Up
       
          </button></Link>
      
       
      </div>
   </nav>
  
    



    </>
  )
}

export default Navbar
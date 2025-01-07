import React from 'react'
//import { Button } from "flowbite-react";
import {Link} from "react-router-dom"

function Header() {
  return (
    <>
    <div className='header-container'>
        <h1 className='headline'>Empowering Students & Faculty with Opportunities and Collaboration!</h1>
        <p className="sub-headline">Join our platform to connect, innovate, and grow together. Explore projects, contribute to research, and find jobs tailored to students and faculty.</p>
       <div className='hero-button-container'>
      <Link to="/signup"> <button className='hero-button'>Get Started</button></Link>
       <button className='hero-button'>Learn More</button>
       </div>
    </div>
    </>
  )
}

export default Header
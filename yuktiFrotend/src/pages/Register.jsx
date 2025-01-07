import React from 'react'

function Register() {
  return (
    <div className="form-container sign-up">
    <form>
      <h5>New Login</h5>
      <h1>Hey! Kids Create Account</h1>
      <div className="social-icons">
        <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
        <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
        <a href="#" className="icon"><i className="fa-brands fa-instagram"></i></a>
        <a href="#" className="icon"><i className="fa-brands fa-snapchat"></i></a>
      </div>
      <span>or use your email for registration</span>
      <input type="text" placeholder="Name" />
      <div className="custom-dropdown">
        <select className="fs_checkbox" name="ageGroup" id="select" defaultValue="Choose Age Group">
          <option value="Choose Age Group" disabled>Choose Age Group</option>
          <option value="3-5">3-5 years</option>
          <option value="6-8">6-8 years</option>
          <option value="9-12">9-12 years</option>
        </select>
        <div className="custom-dropdown-button">&#9660;</div>
      </div>
      <input type="email" placeholder="Parent's Email" />
      <input type="password" placeholder="Password" />
      <button>Sign Up</button>
    </form>
  </div>
  )
}

export default Register
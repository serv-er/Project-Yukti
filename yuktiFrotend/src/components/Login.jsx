import React, { useState,useEffect } from "react";
import {useSelector,useDispatch} from "react-redux"
import { useNavigate ,Link} from "react-router-dom";

import {toast} from "react-toastify"
import "./Login.css";
import { clearAllUserErrors,login } from "../store/slices/userSlice";

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {loading,isAuthenticated,error,message}=useSelector((state)=>state.user)
   
    const dispatch=useDispatch()
    const navigateTo=useNavigate()

  const handleLoginClick = (e) =>{
    e.preventDefault();
    const loginData={email,password};
    dispatch(login(loginData));
  };

  useEffect(()=>{
    if(error){
        toast.error(error)
        dispatch(clearAllUserErrors)
    }
    if(isAuthenticated){
        navigateTo("/");
    }
  },[dispatch,error,loading,isAuthenticated])

  return (
    <div className="login-container">
      
      <div className="login-form-container ">
        
        <form onSubmit={handleLoginClick}>
        <h2 className="login-text">Login</h2>
          
         
         
         <div className="input-container">
         <label className="label">EMAIL</label>
         <input type="email" placeholder="Youremail@gmail.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
         </div>
         <div  className="input-container">
         <label className="label">PASSWORD</label>
         <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
         </div>
          
    
 <p className="for">
 <Link to ="/" className="forgot-password">Forgot Password?</Link>
 </p>
          <button className="login" type="submit">Sign In</button>
          <p className="forgot-password1">or Signup Using</p>
          <div class="social-icons">
  <a href="#" class="icon google"><i class="fa-brands fa-google-plus-g"></i></a>
  <a href="#" class="icon facebook"><i class="fa-brands fa-facebook-f"></i></a>
  <a href="#" class="icon instagram"><i class="fa-brands fa-instagram"></i></a>
  <a href="#" class="icon snapchat"><i class="fa-brands fa-snapchat"></i></a>
</div>
<p className="forgot-password1">or Signup Using</p>
          <p className="forgot-password1">
          <Link to={"/register"} className="forgot-password">Sign Up</Link>
          </p>
        </form>
      </div>
     
    </div>
  );
};

export default Login;

import React, { useState,useEffect } from "react";
import {useSelector,useDispatch} from "react-redux"
import { useNavigate ,Link} from "react-router-dom";
import OAuth from "./OAuth";
import {toast} from "react-toastify"
import "./Login.css";
import { clearAllUserErrors,login } from "../store/slices/userSlice";

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {loading,isAuthenticated,error,user}=useSelector((state)=>state.user)
   
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
    if (isAuthenticated) {
      // Save user data and token to localStorage
      localStorage.setItem("token", user?.token); // Store token
      localStorage.setItem("role", user?.role);   // Store user role
      localStorage.setItem("user", JSON.stringify(user)); // Store full user data

      // Navigate to the respective dashboard based on the user role
      if (user?.role === "Student") {
        navigateTo("/dashboardStudent");
      } else if (user?.role === "Faculty") {
        navigateTo("/dashboardFaculty");
      }
    }
  },[dispatch, error, loading, isAuthenticated, user, navigateTo])

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && role && user) {
      // Restore authentication state if token exists
      dispatch({ type: "user/setUser", payload: { token, role, user } });
      navigateTo(role === "Student" ? "/dashboardStudent" : "/dashboardFaculty");
    }
  }, [dispatch, navigateTo]);

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
<OAuth/>
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

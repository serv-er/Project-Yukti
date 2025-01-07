import React from 'react'
import "./Login.css"
import {GoogleAuthProvider,getAuth,signInWithPopup} from "firebase/auth"
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setGoogleUser } from '../store/slices/userSlice'


const OAuth=()=> {

    const auth=getAuth(app);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
   const handleGoogleLogin=async()=>{
    const Provider= new GoogleAuthProvider();
    Provider.setCustomParameters({prompt:"select_account"});
    try{
      const resultsFromGoogle=await signInWithPopup(auth,Provider);
      const res= await fetch("http://localhost:7000/api/v1/user/google",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            name:resultsFromGoogle.user.displayName,
            email:resultsFromGoogle.user.email,
            googlePhotoUrl:resultsFromGoogle.user.photoURL,
        }),
      });
      const data =await res.json();
      if(res.ok){
          dispatch(setGoogleUser(data));
          navigate("/");
      }
    }
    catch(error){
  console.log(error)
    }
}

  return (
    <div class="social-icons">
  <button type="button" className="icon google" onClick={handleGoogleLogin}><i className="fa-brands fa-google-plus-g"></i></button>
  <button type="button" className="icon facebook"><i className="fa-brands fa-facebook-f"></i></button>
  <button type="button" className="icon instagram"><i className="fa-brands fa-instagram"></i></button>
  <button type="button" className="icon snapchat"><i className="fa-brands fa-snapchat"></i></button>
</div>
  )
}

export default OAuth
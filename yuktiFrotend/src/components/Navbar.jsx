import React,{useEffect} from 'react'
import logoImage from "../assets/logo1.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user,error,loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    
  };
  useEffect(()=>{
    if(error){
      toast.error(error);
       dispatch(clearAllUserErrors());
    }
    if(!isAuthenticated){
      navigateTo("/");
    }

  },[dispatch,error,loading,isAuthenticated])

  
  return (
    <nav className="navbar flex justify-between items-center p-3">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="logo" className="logo-img" />
        </Link>
      </div>
      <div className="nav-container flex-grow flex justify-center">
        <ul className="nav-links flex space-x-3">
          <Link to="/" className="nav-link">
            <li className="nav-items">Home</li>
          </Link>
          <Link to="/About" className="nav-link">
            <li className="nav-items">About</li>
          </Link>
          {isAuthenticated && user && (
            <Link
              to={
                user.role === "Student"
                  ? "/dashboardStudent"
                  : "/dashboardFaculty"
              }
              className="nav-link"
            >
              <li className="nav-items">Dashboard</li>
            </Link>
          )}
        </ul>
      </div>
      <div className="cta">
        {isAuthenticated ? (
          <button className="cta-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/register">
            <button className="cta-btn">Sign Up</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

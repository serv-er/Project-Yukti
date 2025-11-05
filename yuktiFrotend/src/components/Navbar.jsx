import React, { useEffect } from 'react';
import logoImage from "../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigateTo("/"); // ✅ Navigate after logout only
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
  }, [dispatch, error]);

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

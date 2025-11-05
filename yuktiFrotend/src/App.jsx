import React, { useState, useEffect } from "react";
import {Route, Routes} from "react-router-dom";
//import PeregrineSpinner from "./components/PeregrineSpinner"; // Import your custom spinner component
import Navbar from "./components/Navbar";
import  Login from "./components/Login.jsx";
import Home from "./pages/Home.jsx";
import "./App.css"; // Styles for the app
import Register from "./components/Register.jsx";
import DashboardStudent from "./pages/DashboardStudent.jsx";
import DashboardFaculty from "./pages/DashboardFaculty.jsx";

const App = () => {
 
  return (
    <>
     <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/dashboardStudent" element={<DashboardStudent/>}/>
        <Route exact path="/dashboardFaculty" element={<DashboardFaculty/>}/>
        </Routes>     
    </>
  );
}

export default App;

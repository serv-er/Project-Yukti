import React, { useState, useEffect } from "react";
import {Route, Routes} from "react-router-dom";
//import PeregrineSpinner from "./components/PeregrineSpinner"; // Import your custom spinner component
import Navbar from "./components/Navbar";
import  Login from "./components/Login.jsx";
import Home from "./pages/Home.jsx";
import "./App.css"; // Styles for the app
import Register from "./pages/Register.jsx";

const App = () => {
 
  return (
    <>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        </Routes>     
    </>
  );
}

export default App;

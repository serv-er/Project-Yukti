import React from "react";
import PeregrineSpinner from "../components/PeregrineSpinner";
import { useEffect, useState } from "react";


import Header from "../components/Header";

const Home = () => {
    const [isLoading, setIsLoading] = useState(true); // State to track loading
  
    // Simulate a delay for loading (e.g., fetching data or assets)
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Change this duration as needed (e.g., 3000ms for 3 seconds)
  
      return () => clearTimeout(timer); // Cleanup timeout
    }, []);
  
    return (
      <div className="App">
        {isLoading ? (
          // Show the Peregrine Spinner while loading
          <div className="spinner-wrapper">
            <PeregrineSpinner />
          </div>
        ) : (
          // Display main content after loading is complete
          
         <>
         
         <div className="hero-section">
         <div className="main-content">
          <Header />
            <h1>Welcome to Peregrine</h1>
            <p>
              Explore opportunities, collaborate, and grow with our innovative platform.
            </p>
            {/* Add additional sections or components here */}
          </div>
         </div>
         </>
        )}
      </div>
    );
  };
  
  export default Home;
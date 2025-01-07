import React, { useState } from "react";
import MainSidebar from "../components/Sidebar";
import {useSelector} from "react-redux"

const DashboardStudent = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const {isAuthenticated,user}=useSelector((state)=>state.user)

  const renderContent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <div>Welcome to the Dashboard! Sarvesh </div>;
      case "Profile":
        return <div>Profile Section</div>;
      case "All Opportunities":
        return <div>All Opportunities</div>;
      case "College Opportunities":
        return <div> College Opportunities</div>;
      case "Settings":
        return <div>Settings Section</div>;
      case "Chat Room":
        return <div>Chat Room Section</div>;
      case "Private Meeting Room":
        return <div>Start your journey with CampusConnect seamless Personal meeting room, Meet with people you want</div>;
      case "Random Meeting Room":
        return <div>Start your journey with CampusConnect seamless Random meeting room, Meet with Random people </div>;
      case "CampusConnect":
        return <div>CampusConnect Information</div>;
      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-blue">
      {/* Sidebar */}
      <MainSidebar setActiveComponent={setActiveComponent} />
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardStudent;

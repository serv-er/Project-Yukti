import React, { useState } from "react";
import MainSidebar from "../components/Sidebar";
import HackathonUploadForm from "../components/HackathonOpportunityUpload";
import DepartmentalForm from "../components/DepartmentalProject";
import ResearchOpportunityForm from "../components/ResearchOpportunityForm";
import HackathonCard from "../components/HackathonCard";
import FacultyDashboard from "../components/FacultyDashboard";
import PostedOpportunities from "../components/PostedOpportunities";
import { useSelector } from "react-redux";

const DashboardFaculty = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const renderContent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <FacultyDashboard />;
      case "Profile":
        return <div>Profile Section</div>;
      case "Hackos":
        return <HackathonUploadForm />;

      case "College Opportunities":
        return <HackathonCard />;
      case "Research":
        return <ResearchOpportunityForm />;
      case "Departmental":
        return <DepartmentalForm />
      case "My Opportunities":
        return <PostedOpportunities />;
      case "Settings":
        return <div>Settings Section</div>;
      case "Chat Room":
        return <div>Chat Room Section</div>;
      case "Private Meeting Room":
        return (
          <div>
            Start your journey with CampusConnect's seamless Personal meeting
            room. Meet with people you want.
          </div>
        );
      case "Random Meeting Room":
        return (
          <div>
            Start your journey with CampusConnect's seamless Random meeting
            room. Meet with random people.
          </div>
        );
      default:
        return <div>Select a section from the sidebar.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <MainSidebar setActiveComponent={setActiveComponent} />

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">{renderContent()}</div>
    </div>
  );
};

export default DashboardFaculty;

import React, { useState } from "react";
import { Sidebar } from "flowbite-react";
import { useSelector } from "react-redux";
import {
  HiInbox,
  HiChartPie,
  HiViewBoards,
  HiUser,
  HiChat,
  HiVideoCamera,
  HiUsers,
  HiBriefcase,
  
} from "react-icons/hi";

const MainSidebar = ({ setActiveComponent }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar Toggle Button for mobile/tablet */}
     

      {/* Sidebar */}
      <Sidebar
        aria-label="Sidebar with logo branding example"
        className={`h-full bg-blue-500 text-white min-w-[200px] transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={HiChartPie}
              className="hover:bg-blue-600"
              onClick={() => setActiveComponent("Dashboard")}
            >
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiViewBoards}
              className="hover:bg-blue-600"
              onClick={() => setActiveComponent("Profile")}
            >
              Profile
            </Sidebar.Item>

            {/* Dropdown for Opportunities */}
            {isAuthenticated && user ? (
              <Sidebar.Collapse
                icon={HiInbox}
                label={user.role === "Student" ? "Opportunities" : "Create Opportunities"}
                className="hover:bg-blue-600"
              >
                {user.role === "Student" ? (
                  <>
                    <Sidebar.Item
                      href="#"
                      onClick={() => setActiveComponent("All Opportunities")}
                      className="hover:bg-blue-600"
                    >
                      All Opportunities
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="#"
                      onClick={() => setActiveComponent("College Opportunities")}
                      className="hover:bg-blue-600"
                    >
                      College Opportunities
                    </Sidebar.Item>
                  </>
                ) : (
                  <>
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-blue-600"
                      onClick={() => setActiveComponent("Hackos")}
                    >
                      Hackathons & Competitions
                    </Sidebar.Item>
                
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-blue-600"
                      onClick={() => setActiveComponent("Departmental")}
                    >
                      Departmental Projects
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="#"
                      className="hover:bg-blue-600"
                      onClick={() => setActiveComponent("Research")}
                    >
                      Research Opportunities
                    </Sidebar.Item>
                  </>
                )}
              </Sidebar.Collapse>
            ) : null}
             {
              user.role==="Student" ? (
<Sidebar.Item
              href="#"
              icon={HiBriefcase}
              className="hover:bg-blue-600"
              onClick={() => setActiveComponent("My Applications")}
            >
              My Applications
            </Sidebar.Item>
              ):(
                <>
                <Sidebar.Item
              href="#"
              icon={ HiBriefcase}
              className="hover:bg-blue-600"
              onClick={() => setActiveComponent("My Opportunities")}
            >
              My Opportunities
            </Sidebar.Item>
            <Sidebar.Item
            href="#"
            icon={ HiBriefcase}
            className="hover:bg-blue-600"
            onClick={() => setActiveComponent("Applications")}
          >
           Applications
          </Sidebar.Item></>
              )
             }
            <Sidebar.Item
              href="#"
              icon={HiUser}
              className="hover:bg-blue-600"
              onClick={() => setActiveComponent("Settings")}
            >
              Settings
            </Sidebar.Item>
            <Sidebar.Collapse
              icon={HiUsers}
              label="Campus Connect"
              className="hover:bg-blue-600"
            >
              <Sidebar.Item
                href="#"
                className="hover:bg-blue-600"
                onClick={() => setActiveComponent("Chat Room")}
              >
                Chat Room
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                className="hover:bg-blue-600"
                onClick={() => setActiveComponent("Private Meeting Room")}
              >
                Private Meeting Room
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                className="hover:bg-blue-600"
                onClick={() => setActiveComponent("Random Meeting Room")}
              >
                Random Meeting Room
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
             className="  bg-blue-500 text-white p-3 rounded-md z-50"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? "Close" : "Open"} Sidebar
              </Sidebar.Item>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
    
      </Sidebar>
    
    </div>
  );
};

export default MainSidebar;

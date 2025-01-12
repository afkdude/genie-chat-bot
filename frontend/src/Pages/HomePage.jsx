import  { useState } from 'react'
import Sidebar from '../Components/Sidebar';
import MainArea from '../Components/MainArea';
import '../App.css'

const HomePage = () => {
const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

// Function to toggle the sidebar state
const toggleSidebar = () => {
  setIsSidebarMinimized((prev) => !prev);
};

return (
  <div className="gradient-background-app flex w-[100vw] h-[100vh] bg-[#F2F9FF]">
    <Sidebar
      isSidebarMinimized={isSidebarMinimized}
      toggleSidebar={toggleSidebar}
    />
    <MainArea isSidebarMinimized={isSidebarMinimized} />
  </div>
);
}

export default HomePage
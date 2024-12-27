import { useState } from "react";
import {
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  Comment as CommentIcon,
  Build as BuildIcon,
  Folder as FolderIcon,
} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BookIcon from '@mui/icons-material/Book';
import { setcourseStatus } from "../Redux/ReduxTlkit";
import { useDispatch, useSelector } from "react-redux";
import BarChartIcon from '@mui/icons-material/BarChart';
import { Typography } from '@mui/material';
import { Box, Button } from '@mui/material';



function Sidebar() {
  const dispatch=useDispatch();
  const SidebarStatus= useSelector((state)=> state.Course.courseStatus || "Courses" );
  const { email, id ,firstName,_id} = useSelector((state) => state.Course.userDetails);

  console.log(SidebarStatus,"ssssssssssssssssssss");



  const handleItemClick = (item) => {
    dispatch(setcourseStatus(item));
  };

  return (
    <div className="sidebar">
      <div  >
      <Typography
  variant="h4"
  className="head"
  sx={{
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '16px',
    textTransform: 'uppercase',
  }}
>
  <span style={{ color: 'black' }}>Cour</span>
  <span style={{ color: 'red' }}>s</span>
  <span style={{ color: 'black' }}>e</span>




</Typography>

</div>
      <ul>
        <button
    className={SidebarStatus === "My Learning" || SidebarStatus === "Enroll Status" ? "active" : ""}

          onClick={() => handleItemClick(email === "admin@gmail.com" ? "Enroll Status": "My Learning" )}
          style={{ display: "flex", alignItems: "center" }} 
        >
          <LightbulbIcon sx={{ marginRight: "8px" }}      
          
  //         style={{
  //   color: (SidebarStatus === "My Learning" || SidebarStatus === "Enroll Status") 
  //     ? "yellow" 
  //     : "black"
  // }} 
  
  />
          {email === "admin@gmail.com" && <li>Enroll Status</li>}
          {email != "admin@gmail.com" && <li>My Learning</li>}
        </button>
        <button
          className={SidebarStatus === "Courses" ? "active" : ""}
          onClick={() => handleItemClick("Courses")}
          style={{ display: "flex", alignItems: "center" }} 
        >
          <SchoolIcon sx={{ marginRight: "8px" }} />
          <li>Courses</li>
        </button>
        <button
          className={SidebarStatus === "Profile" ? "active" : ""}
          onClick={() => handleItemClick("Profile")}
          style={{ display: "flex", alignItems: "center" }} 
        >
          <PersonIcon sx={{ marginRight: "8px" }} />
          <li>Profile</li>
        </button>
        {email === "admin@gmail.com" &&     <button
          className={SidebarStatus === "StatsPage" ? "active" : ""}
          onClick={() => handleItemClick("StatsPage")}
          style={{ display: "flex", alignItems: "center" }} 
        >
          <PersonIcon sx={{ marginRight: "8px" }} />
          <li>Stats</li>
        </button>}
        {
          email != "admin@gmail.com" && 
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ccc',
        padding: '16px',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
        maxWidth: '300px',
        marginTop:"220px",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
        Upgrade to Pro Plan
      </Typography>
      <Typography variant="body2" sx={{ color: '#666', marginBottom: '16px' }}>
        Unlock exclusive features and boost your experience!
      </Typography>
      <Button variant="contained" color="primary">
        Upgrade Now
      </Button>
    </Box>}
      </ul>
    </div>
  );
}

export default Sidebar;

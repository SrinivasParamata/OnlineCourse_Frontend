import React from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import PersonIcon from '@mui/icons-material/Person';


import "../Styles/PassTes.css";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Mylearning from './Learning';

const PersonDetails = ({showUserc}) => {

  
  console.log(showUserc,"showUserc");
  const { email, id ,firstName,_id} = useSelector((state) => state.Course.userDetails);
  const checkUser= email === "admin@gmail.com" ? true : false;
  const userToken = useSelector((state) => state.Course.token);
  const navigate = useNavigate();








  const DeleteToken = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/student/studentlogout", {
        method: "POST",
        headers: {
          Authorization: `${userToken}`,
        },
      });

      const data = await response.text();
      console.log(data,"dataaaa");
      if (data === "Logout successful") {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error validating token:", err);
    }
  };




  return (<>
    <div className="person-info">
    <div className="grid-containerr"   >
      <div className="grid-item">
        {/* Arrow icon button */}
        <button className="icon-button">
          <span className="arrow-icon">
            <ArrowBackOutlinedIcon  sx={{ fontSize: '25px' }} /> {/* Arrow Circle Left Icon */}
          </span>
        </button>

        {/* Notification icon button */}
        <button className="icon-button"  onClick={()=>{console.log("test")}} >
          <span className="noti-icon">
            <NotificationsNoneOutlinedIcon   sx={{ fontSize: '37px' }}  /> {/* Notification Icon */}
          </span>
        </button>
      </div>

      <div className="grid-item">
        <div className="username-box">{firstName ? firstName :""}
          <p>{checkUser ? "Admin" : "Student"}</p>
        </div>
        <div className="profile-icon">
          <Link   >
          <PersonIcon onClick={()=>DeleteToken()}  sx={{ fontSize: '42px' }}  />
          </Link>   
          </div>
      </div>
    </div>
    {!checkUser && 
    <Mylearning/>}
  </div>

</>  
  );
};

export default PersonDetails;

import "../App.css";
import Sidebar from "../Pages/Sidebar";
import CourseList from "../Pages/CourseList";
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import  PersonDetails from "../Pages/PersonDetails";
import ProfilePage from "./ProfilePage";
import ShowCourses from "./ShowCourses";
import {useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "./Adminpage";
import StatsPage from "./StatsPage";
import CourseWrap from "./Coursewrap";



export const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: '#f5f5f5',
      },
      text: {
        primary: '#000',
        secondary: '#757575',
      },
    },
});



const MainPage = () => {
  const data=useLoaderData();
  const dispatch= useDispatch();
  const token = useSelector((state) => state.Course.token);
  const showCourse = useSelector((state)=> state.Course.courseStatus);
  const [validate ,setValidate]=useState(true);
  const navigate= useNavigate();

  const ValidateToken = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/student/validateToken", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = await response.text();
      console.log(data,"dataaaa");
      if (data === "Token not found" || data === "Token is invalid or expired") {
        console.log("Logout Successfully");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error validating token:", err);
    }
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (validate) {
  //       console.log("setTimeout triggered");
  //       ValidateToken();
  //       setValidate(false);
  //     }
  //   }, 120000);
  
 
  //   return () => clearTimeout(timeout);
  // }, [validate]);
  


  

    return (
        <div className="root">
            <ThemeProvider theme={theme}> 
                <Sidebar />
                {showCourse ==="Courses" && <>
                <CourseWrap/>
                <PersonDetails   />
                </>}
                {showCourse === "Profile" && <ProfilePage/>}
                {showCourse === "My Learning"  && <ShowCourses/>}
                {showCourse === "Enroll Status"  && <AdminPage/> }
                {showCourse === "StatsPage"  && <StatsPage/> } 
            </ThemeProvider>
        </div>
    );
}

export default MainPage;


// export const GetUserCourses = async () => {
  
//   try {
//     const response = await fetch(`http://localhost:8081/api/enroll/getAllEnrollcourses`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await response.json();

//     console.log(data, "loaderGetUserC");
//     return data;
//   } catch (err) {
//     console.error("Error fetching courses:", err);
//     return [];
//   }


// };

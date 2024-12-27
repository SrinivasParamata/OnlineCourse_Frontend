import "../Styles/learning.css";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Mylearning() {
    const { email, _id } = useSelector((state) => state.Course.userDetails);
    const navigate = useNavigate();
    const [mergedCourses, setMergedCourses] = useState([]);
    const token = useSelector((state) => state.Course.token);
  
    const getColorForCourse = (index) => {
      const colors = ["darkslateblue", "slateblue", "firebrick", "mediumseagreen", "goldenrod"];
      return colors[index % colors.length];
    };
  
  
    async function getEnrollStatus() {
      try {
        const response = await fetch(`http://localhost:8081/api/enroll/getAllEnrollcourses`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const data = await response.json();
    
        return data;
      } catch (err) {
        console.error("Error fetching courses:", err);
        return [];
      }
    }
  
    async function getUserCourses() {
      try {
        const response = await fetch("http://localhost:8081/api/enroll/getUserCourses", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = await response.json();
        console.log("API Response:", data);
        return data;
      } catch (err) {
        console.error("Error fetching courses:", err);
        return [];
      }
    }
  
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const courses = await getUserCourses();
          const enrollStatus = await getEnrollStatus();
    
          if (Array.isArray(courses)) {
            const mergedCourses = courses.map(course => {
              const matchingEnroll = enrollStatus.find(status => status.courseId === course._id);
              return {
                ...course,
                status: matchingEnroll?.status || null,
                randomProgress: Math.floor(Math.random() * 100) + 1, // Precompute random number
              };
            });
            
    
            setMergedCourses(mergedCourses); // Update the state with merged courses
          } else {
            console.error("Invalid API response format.");
            setMergedCourses([]); // Fallback
          }
        } catch (error) {
          console.error("Error fetching courses or enroll status:", error);
          setMergedCourses([]); // Fallback in case of error
        }
      };
    
      fetchCourses();
    }, [_id]); // Ensure _id is part of the dependency array
    

  return (
    <>
  
      <div className="myLearn">
        <p>My Learning</p>
        <div className="course-learn">
          {mergedCourses.length > 0 && mergedCourses.map((course) => (
            <div key={course.id} className="course-item"        onClick={() => {
              if (course.status !== "Completed") {
                navigate(`/prevCourse/${course.courseName}`);
              }
            }} >
                <div className="learn-icon">
    <img
      src="/teacher (1).png"
      alt="Logo"
      style={{
        width: '70px',  // Adjust size as needed
        height: '70px', // Adjust size as needed
        borderRadius: '10%',
        objectFit: 'cover',
      }}
    />
  </div>
    <div className="learn-content"  >
    <div className="learn-name">{course.courseName}</div>
    <div className="learn-descrp">
    {course.courseDescrp}
    </div>
  </div>
  <div className="learn-bar">


<Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <CircularProgress 
                        variant="determinate" 
                        value={course.status === "Completed" ? 100 : course.randomProgress} 
                        color="white"
                        size={56}
                        sx={{  
                          '& .MuiCircularProgress-circle': {
                            stroke: '#FF5722', // Set custom stroke color
                          },
                        }} 
                      />
                      <Box
                        sx={{
                          position:"absolute",
                          marginLeft:"10px",
                          marginTop:"16px"
                        }}
                      >
                        <Typography variant="caption"  sx={{fontSize:"15px" ,color:"black" }} >
                          { course.status === "Completed" ? 100 : course.randomProgress}%

                        </Typography>
                      </Box>
                    </Box>
</div>

                </div>
          ))}
         {mergedCourses.length === 0 && email !== "admin@gmail.com" && (
  <p>No courses enrolled by the user</p>
)}
{email === "admin@gmail.com"  && <p>Admin don't have learning progress</p>}

        </div>
      </div>

    </>
  );
}

export default Mylearning;

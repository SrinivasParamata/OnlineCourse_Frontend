
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styles from "../Styles/RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import { Button , Tooltip } from "@mui/material";
import { Typography, Box } from '@mui/material';

function ShowCourses() {
  const {  _id } = useSelector((state) => state.Course.userDetails);
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
              status: matchingEnroll.status || null, // Add enroll status if found, otherwise null
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
  

  console.log("Merged Courses:", mergedCourses);

  return (
    <div className={styles.container}>
      <div className="course-list">
        {Array.isArray(mergedCourses) && mergedCourses.length > 0 ? (
          mergedCourses.map((course, index) => (
            <div key={course.courseId} className="course-card">
              <div
                className="grid-container"
                style={{ backgroundColor: getColorForCourse(index) }}
                onClick={() => {
                  if (course.status !== "Completed") {
                    navigate(`/prevCourse/${course.courseName}`);
                  }
                }}
              >
                <div>
                   <div 
  className="course-icon" 
  style={{ 
    gridArea: "menu", 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100px', 
    height: '80px', 
    borderRadius: '8px', 
    backgroundColor: "transparent", 
    cursor: 'pointer'
  }}
>
  <img 
    src="/teacher (1).png" 
    alt="Logo" 
    style={{ 
      width: '60px',  // Adjust size as needed
      height: '60px', // Adjust size as needed
      borderRadius: '10%',
      objectFit: 'cover'
    }} 
  />
</div>
                </div>
                <div className="course-content" style={{ gridArea: "main" }}>
                  <div className="course-name">{course.courseName}</div>
                  <div className="course-descrpp">{course.courseDescrp}</div>
                </div>
                <div className="course-footer" style={{ gridArea: "footer" }}>
                  <progress
                    value={
                      course.status === "Completed"
                        ? 100
                        : Math.floor(Math.random() * 80) + 20
                    }
                    max="100"
                  ></progress>
                  {course.status === "Completed" && (
                    <Tooltip title="Course Completed" arrow>
                      <Button style={{ marginLeft: "430px", marginTop: "0px", color: "white" }}>
                        Completed✅
                      </Button>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <Typography variant="h6" sx={{ color: "#555", textAlign: "center" }}>
              No active enrollments at the moment
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}


export default ShowCourses;
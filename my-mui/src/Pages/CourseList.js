

import { ReduxToolKitStore } from "../Redux/Store";
import { useEffect, useState } from "react";
import CourseWrapper from "../Pages/CourseWrapper";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, setcourseStatus } from "../Redux/ReduxTlkit";
import "../App.css";
import { Typography, Box } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';  

function CourseList() {
  const data = new Date();
  const loaderData=flattenAndRemoveDuplicates(useLoaderData()) || [];
  const show = useSelector((state)=> state.Course.courseStatus)  || [];
  const status = useSelector((state) => state.Course.courseStatus) || [];

  const [AdminCourse,setAdminCourse] =useState(flattenAndRemoveDuplicates(useSelector((state) => state.Course.courses  || [])));
  const { email, id ,firstName,_id} = useSelector((state) => state.Course.userDetails);
  const token = useSelector((state) => state.Course.token);

  const [enrollStatus, setEnrollStatus] = useState({}); 
  const [showCourses, setShowCourses] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function flattenAndRemoveDuplicates(arr) {
    if (!Array.isArray(arr)) {
      return []; // Return an empty array if arr is not valid
    }
    const flattened = arr.flat() || [];
  
    // Remove duplicates by using a Set and keeping track of unique _id values
    const uniqueItems = [];
    const seenIds = new Set();
  
    for (const item of flattened) {
      if (!seenIds.has(item._id)) {
        seenIds.add(item._id);
        uniqueItems.push(item);
      }
    }
  
    return uniqueItems;
  }

  useEffect(()=>{
    flattenAndRemoveDuplicates();
  },[status])



  useEffect(()=>{
    if (!email) {
      navigate('/error');
    }
  })


  useEffect(()=>{
    getAdminCourses();
  },[status])

  const getAdminCourses = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/course/getCourses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      setAdminCourse(flattenAndRemoveDuplicates(data));
      dispatch(addCourse(data));
      return data;
    } catch (err) {
      console.error("Error fetching courses:", err);
      return [];
    }
  };
  



  function flattenAndMergeCourses(id, adminCourses, loaderData) {
    console.log(adminCourses, loaderData);
    const enrolledCourseIds = loaderData
      .filter((data) => {
        console.log(`Matching studentId: ${data.studentId} with id: ${id}`);
        return data.studentId === id; // Match the student ID
      })
      .map((data) => {
        console.log(`Found courseId: ${data.courseId}`);
        return data.courseId; // Extract course IDs
      });

    const remainingCourses = adminCourses.filter((course) => {
      const isEnrolled = enrolledCourseIds.includes(course._id);
      console.log(`Course _id: ${course._id} is already enrolled: ${isEnrolled}`);
      return !isEnrolled; // Exclude enrolled courses
    });

    console.log(remainingCourses, "remaining c");

    return remainingCourses;
}


const mergedCourses = flattenAndMergeCourses(_id, AdminCourse, loaderData) || [];

  console.log(mergedCourses,"mergedcoursesss",show);
  console.log("started");


  const enrollInCourse = async (courseName,CourseId) => {
 
    try {
      const response = await fetch(
       `http://localhost:8081/api/enroll/enrollNewId/${CourseId}`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      console.log(response,"resp");

      const data = await response.text();

      if (response.ok) {
        console.log("Ended");
        navigate(`/prevCourse/${courseName}`); 
        
      } else {
        console.log(data,data.message);
      }
    } catch (error) {
      console.log(data,data.message);
    }
  };


  const isEnrolled = (courseId) => loaderData.some((course) => course.courseId === courseId);

  const getColorForCourse = (index) => {
    const colors = [
        "indigo",         // Darker blue shade
        "mediumslateblue",// Slightly darker lavender shade
        "darkred",        // Darker version of tomato
        "darkgreen",      // Darker version of seagreen
        "olive"           // Muted, dark yellow-green shade
    ];
    return colors[index % colors.length];
};


  const toggleCourseWrapper = async () => {
    setShowCourses((prev) => !prev);
    console.log("toggleeeeeee");
    getAdminCourses();
    console.log(AdminCourse,"Adminnnn");

    
  };

  return (
    <>
      {showCourses && <CourseWrapper    onClose={toggleCourseWrapper} />}
      <div className="course">
        <div className="chead">
          <h2>Course Activity</h2>
          <p>{`${data.toLocaleString("default", { month: "short" })} ${data.getDate()}th, ${data.getFullYear()}`}</p>
        </div>
        <div className="buttonDiv">
          <button    className={email !== "admin@gmail.com" ? "disable" :"" } disabled={email !== "admin@gmail.com"} onClick={toggleCourseWrapper}>
            +
          </button>
        </div>

        <div className="subclass">
          <div className="container">
            {show === "Courses" && mergedCourses.length > 0 ? (
              <div className="course-list">
                {mergedCourses
                  .map((course, index) => (
                    <div key={course.courseName} className="course-card">
                      <div
                        className="grid-container"  
                        style={{ backgroundColor: getColorForCourse(index) } } 
                      >
                           <div 
  className="course-icon" 
  onClick={email === "admin@gmail.com" ? () => navigate(`/prevCourse/${course.courseName}`) : undefined}
  
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
    src="/teacher (2).png" 
    alt="Logo"
    loading="lazy" 
    style={{ 
      width: '60px',  
      height: '60px', 
      borderRadius: '10%',
      objectFit: 'cover'
    }} 
  />
</div>

                        <div className="course-content" style={{ gridArea: "main" }}>
                          <div className="course-name">{course.courseName}</div>
                          <div className="course-descrpp">{course.courseDescrp}</div>
                        </div>
                       {email !== "admin@gmail.com" && <>

                        <div className="course-right" style={{ gridArea: "right" }}>
                        <div className="total">{Math.floor(Math.random() * 11) + 10}</div>

                          <span
                            className={
                              enrollStatus[course.courseId] === "enrolled" ||
                              isEnrolled(course.courseId)
                                ? "active"
                                : ""
                            }
                          >
                            {enrollStatus[course.courseId] === "enrolled" ||
                            isEnrolled(course.courseId)
                              ? "Enrolled"
                              : "Claim Your Spot"}
                          </span>
                        </div>

                        <div className="course-footer" style={{ gridArea: "footer" }}>
                          <div className="bar-button">
                            {!isEnrolled(course.courseId) &&
                              enrollStatus[course.courseId] !== "enrolled" && (
                                <button
                                  onClick={() => enrollInCourse(course.courseName,course._id)}
                                  disabled={
                                    enrollStatus[course._id] === "enrolling"
                                  }
                                >
                                  {enrollStatus[course._id] === "enrolling"
                                    ? "Enrolling..."
                                    : "Enroll"}
                                </button>
                              )}
                          </div>
                        </div>
                        </>} 
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              show === "Courses" && <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px', // Adjust based on layout
                backgroundColor: '#f9f9f9',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                padding: '16px',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#555',
                  fontStyle: 'italic',
                  textAlign: 'center',
                }}
              >
                {email === "admin@gmail.com" ? "You haven't created any courses yet." : "No courses available"}
              </Typography>
            </Box>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseList;






export const GetUserCourses = async () => {
  
  try {
    const response = await fetch(`http://localhost:8081/api/enroll/getAllEnrollcourses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data, "loaderGetUserC");
    return data;
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }


};
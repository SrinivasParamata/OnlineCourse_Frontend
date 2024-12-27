import { useRef, useState } from "react";
import "../Styles/CourseWrapper.css";
import { useDispatch } from "react-redux";
import { addCourse } from "../Redux/ReduxTlkit";
import classes from  "../Styles/login.module.css";
import toggle from "../Redux/ReduxTlkit";

const CourseWrapper = ({ onClose ,refreshCourses}) => {
  const courseName = useRef();
  const courseCode = useRef(null);
  const courseDescrp = useRef(null);
  const courseCredits = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const Dispatch= useDispatch();

  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const SubmitHandler = async(e) => {
    e.preventDefault();
    
    const newCourse = {
      courseName: capitalizeFirstLetter(courseName.current.value),
      courseDescrp: capitalizeFirstLetter(courseDescrp.current.value),
      courseCredits: courseCredits.current.value,
      courseCode: courseCode.current.value,
    };

    console.log(newCourse,"newC");

    // if (newCourse.courseName === courseName.current.value){
    //   setErrorMsg("Course Name is already exits");

    // }
    if (!courseName.current.value.trim()) {
      setErrorMsg("Course Name is required");
    } else if (!courseDescrp.current.value.trim()) {
      setErrorMsg("Course Description is required");
    } else if (!courseCredits.current.value || isNaN(courseCredits.current.value)) {
      setErrorMsg("Course Credits must be a number");
    } else if (!courseCode.current.value.trim()) {
      setErrorMsg("Course Code is required");
    }
    else {
      try {
        // Sending the new course data to the backend
        const response = await fetch("http://localhost:8081/api/course/addcourse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCourse),
        });
        
        // Assuming the response will be a string message
        const data = await response.text();
        console.log(data, "response from addcourse");

        // Check the response and display corresponding messages
        if (data === "Course is already registered") {
            setErrorMsg("Course is already registered");  // Display error message if the course is already registered
        } else if (data === "Course added sucessfully") {
          console.log("checkkkkkkkkkkkkkkkkkkkk");
            onClose(); // Close the modal on successful addition of the course
            console.log("Course added successfully");
            setErrorMsg("");  // Clear any previous error messages
        } else {
            console.error("Error adding course:", data);
        }
    } catch (err) {
        // Catch any network or fetch-related errors
        console.error("Error calling API:", err);
    }
    }
 
    
   
  };
  

  const handleModalClick = (e) => {
    // Prevents the modal from closing if the form or its contents are clicked
    e.stopPropagation();
  };

  return (
    <div className="course-wrapper-overlay" onClick={onClose}>
      <div className="course-wrapper" onClick={handleModalClick}>
        <span className="close-btn" onClick={onClose}>&times;</span> {/* Close button */}
        <form onSubmit={SubmitHandler}>
          <div>
            <label>Course Name:</label>
            <input type="text" ref={courseName} />
          </div>
          <div>
            <label>Course Description:</label>
            <input type="text" ref={courseDescrp} />
          </div>
          <div>
            <label>Course Code:</label>
            <input type="number" ref={courseCode} />
          </div>
          <div>
            <label>Course Credits:</label>
            <input type="number" ref={courseCredits} />
          </div>
          <div>
            <button type="submit">Submit</button>
            {errorMsg && <div className={classes.errorMsg}>{errorMsg}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseWrapper;

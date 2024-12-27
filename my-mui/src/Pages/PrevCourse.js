import { useNavigate, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { setcourseStatus } from "../Redux/ReduxTlkit";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


function PrevCourse() {
    const { CourseName } = useParams();
    const navigate = useNavigate();
    const [Admincourses,setAdminCourse]=useState(useSelector((state) => state.Course.courses)) || [];

    const flattenedCourses = Admincourses.flat();
    const course = flattenedCourses.find(course => course.courseName === CourseName);
    const status = useSelector((state) => state.Course.courseStatus);
    const { email, id, firstName, _id } = useSelector((state) => state.Course.userDetails) || [];
    const token = useSelector((state) => state.Course.token);

    const dispatch = useDispatch();

    const [isComplete, setIsComplete] = useState(false);
    const [hasRead, setHasRead] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedCourse, setEditedCourse] = useState({
        _id: course?._id || '',
        courseourseName: course?.courseName || '',
        courseDescrp: course?.courseDescrp || '',
        courseCode: course?.courseCode || '',
        courseCredits: course?.courseCredits || '',
    });

    const paragraphRef = useRef(null);

    function showHandler() {
        if (status === "My Learning") {
            dispatch(setcourseStatus("My Learning"));
            navigate("/Course");
        } else if (status === "Courses") {
            navigate("/Course");
        }
    }

    


//  const GetAllCourses = async () => {
//     try {
//       const response = await fetch("http://localhost:8081/api/course/getCourses", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
  
//       const data = await response.json();
//       console.log(data, "loader");
//       setAdminCourse(data);
//     } catch (err) {
//       console.error("Error fetching courses:", err);
//     }
//   };

useEffect(()=>{
    GetAllCourses()
},[status]);








    const handleScroll = () => {
        if (paragraphRef.current) {
            console.log(paragraphRef.current.value, "valll");
            setHasRead(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCourse({ ...editedCourse, [name]: value });
    };

    const saveChanges = async () => {
        console.log(editedCourse,"editedCourse before");
        try {
            const response = await fetch("http://localhost:8081/api/course/editCourse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedCourse),
            });
    
            const data = await response.text();
            console.log(response,"response");
            console.log(editedCourse,"editedCourse after");
    
            if (response.ok) {
                GetAllCourses();
                setIsEditing(false);
            } else {
                console.error("Failed to mark course as complete.");
            }
        } catch (error) {
            console.error("Error calling API:", error);
        }
        console.log("Saved course data:", editedCourse);
    };
    
    const GetAllCourses = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/course/getCourses", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            const data = await response.json();
            console.log(data, "loader");
    
            // Update AdminCourses state with new data
            setAdminCourse(data);
    
            // If the course exists, update the editedCourse state to reflect the new data
            const updatedCourse = data.flat().find(course => course._id === editedCourse._id);
            if (updatedCourse) {
                setEditedCourse(updatedCourse);
            }
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };
    

    async function StatusCourseHandler(cid) {
        try {
            const response = await fetch(`http://localhost:8081/api/enroll/coursestatus/${cid}`, {
                method: "POST",
                headers: {
                    Authorization: `${token}`,
                  },
            });
            const data = await response.text();
            console.log(response,data ,"chek");

            if (response.ok) {
                showHandler();
            } else {
                console.error("Failed to mark course as complete.");
            }
        } catch (error) {
            console.error("Error calling API:", error);
        }
    }

    const DeleteCourseHandler = async (cid) => {
        try {
            const response = await fetch(`http://localhost:8081/api/course/delcourse/${cid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.text();
            console.log(response,"res[ delete",data);

            if (response.ok) {
                showHandler();
            } else {
                console.error("Failed to delete course.");
            }
        } catch (error) {
            console.error("Error calling API:", error);
        }
    };

    return (
        <Box sx={{ position: "relative", minHeight: "100vh", backgroundColor: "#f9f9f9", p: 3 }}>
            {/* Back Button */}
            <Button
                sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    backgroundColor: "#007BFF",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                        backgroundColor: "#0056b3",
                    },
                }}
                onClick={showHandler}
            >
                <ArrowBackOutlinedIcon sx={{ mr: 1 }} />
                Back
            </Button>

            {/* Course Details */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                    maxWidth: 900,
                    margin: "0 auto",
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", mb: 2 }}>
                    Course Name: {CourseName}
                </Typography>

                {course ? (
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        {isEditing ? (
                            <>
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    name="courseDescrp"
                                    value={editedCourse.courseDescrp}
                                    onChange={handleInputChange}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Course Code"
                                    variant="outlined"
                                    name="courseCode"
                                    value={editedCourse.courseCode}
                                    onChange={handleInputChange}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    label="Course Credits"
                                    variant="outlined"
                                    name="courseCredits"
                                    value={editedCourse.courseCredits}
                                    onChange={handleInputChange}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <Button onClick={saveChanges} sx={{ mt: 2 }} variant="contained" color="primary">
                                    Save Changes
                                </Button>
                            </>
                        ) : (
                            <>
                                <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                                    Description: {course.courseDescrp}
                                </Typography>
                                <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                                    Course Code: {course.courseCode}
                                </Typography>
                                <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                                    Course Credits: {course.courseCredits}
                                </Typography>
                                {email === "admin@gmail.com" && 
                                <Button
                                    sx={{
                                        backgroundColor: "#007BFF",
                                        color: "white",
                                        padding: "10px 20px",
                                        borderRadius: 1,
                                        mt: 2,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        "&:hover": {
                                            backgroundColor: "#0056b3",
                                        },
                                    }}
                                    onClick={() => setIsEditing(true)} // Toggle to edit mode
                                >
                                    Edit
                                </Button>}
                            </>
                        )}
                    </Box>
                ) : (
                    <Typography variant="h6" sx={{ color: "#FF4F4F", fontWeight: "bold", mt: 2 }}>
                        Course not found
                    </Typography>
                )}
                {email === "admin@gmail.com" && (
                    <>
                        <Button
                            onClick={() => DeleteCourseHandler(course._id)}
                            sx={{
                                backgroundColor: "#FF4F4F",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: 1,
                                mt: 3,
                                display: "inline-flex",
                                alignItems: "center",
                                "&:hover": {
                                    backgroundColor: "#d12f2f",
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </>
                )}
                {email != "admin@gmail.com"  && <>
                
                {/* <Button
                    onClick={() => StatusCourseHandler(course._id)}
                    sx={{
                        backgroundColor: "#FF4F4F",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: 1,
                        mt: 3,
                        display: "inline-flex",
                        alignItems: "center",
                        "&:hover": {
                            backgroundColor: "#d12f2f",
                        },
                    }}
                >
                    Completed
                </Button> */}
          
          <Box
                    ref={paragraphRef}
                    onScroll={handleScroll}
                    sx={{
                        maxHeight: 320,
                        overflowY: "auto",
                        padding: 2,
                        border: "1px solid #ccc",
                        borderRadius: 1,
                        mt: 3,
                        backgroundColor: "#fff",
                    }}
                >
                    <Typography variant="h5">{course?.courseName}</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{course?.courseDescrp}</Typography>

                    {/* Static content for the course */}
                    <Typography variant="body1">
                        Modern technologies are reshaping the global landscape, fueling unprecedented innovation and redefining the boundaries of what is possible. From artificial intelligence and machine learning to blockchain and cloud computing, these cutting-edge advancements are transforming how businesses operate and how individuals interact with technology. Developers are leveraging frameworks like React, Next.js, and TailwindCSS to build applications that are not only highly responsive but also scalable, secure, and user-centric.
                    </Typography>
                    <br />
                    <Typography variant="body1">
                        Modern DevOps pipelines and cloud infrastructure empower teams to deliver seamless solutions with agility, optimizing workflows and reducing time-to-market. In this ever-evolving technological landscape, staying ahead requires a commitment to continuous learning and adapting to the latest tools and trends.
                    </Typography>
                    <br />
                    <Typography variant="body1">
                        As technology progresses, its impact on industries becomes more profound, unlocking avenues for efficiency, collaboration, and creativity. The adoption of microservices architecture, containerization with Docker and Kubernetes, and serverless computing has significantly enhanced scalability and resource utilization. Simultaneously, advancements in cybersecurity ensure that the rapid pace of development is matched with robust protection against threats. Embracing modern technologies is no longer an option—it is a strategic imperative. By mastering these innovations, professionals can create transformative solutions that not only meet today's demands but also anticipate the needs of the future, driving sustainable growth and success.
                    </Typography>
                </Box>

                {/* Checkbox to Mark as Complete */}
                {hasRead && (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isComplete}
                                onChange={(e) => setIsComplete(e.target.checked)}
                            />
                        }
                        label="I have read the above content and agree to mark the course as complete."
                        sx={{ mt: 2 }}
                    />
                )}

                {/* Button to Mark as Complete */}
                {hasRead && isComplete && (
                    <Button
                        sx={{
                            backgroundColor: "#28a745",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: 1,
                            mt: 3,
                            "&:hover": {
                                backgroundColor: "#218838",
                            },
                        }}
                        onClick={() => StatusCourseHandler(course._id)}
                    >
                        Mark as Complete
                    </Button>
                )}        
                </>}
            </Box>
        </Box>
    );
}

export default PrevCourse;

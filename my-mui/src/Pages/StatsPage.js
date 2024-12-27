import { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box,Typography,Card,CardContent,Grid2,Paper} from "@mui/material";
import "../Styles/statspage.css";


function flattennAndRemoveDuplicates(arr) {
  const flattened = arr.flat();
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

function StatsPage() {
  const [EnrollCourses, setEnrollCourses] = useState([]);
  const [enrollmentDetails, setEnrollmentDetails] = useState([]);
  const [AdminCourse, setAdminCourse]= useState([]);
  const status = useSelector((state) => state.Course.courseStatus) || [];

  const GetAllEnrollCourses = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/student/getAlldetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setEnrollCourses(flattennAndRemoveDuplicates(data));
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };



  const AdminCourses= async()=>{
    try {
      const response = await fetch("http://localhost:8081/api/course/getCourses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      setAdminCourse(flattennAndRemoveDuplicates(data));
      console.log(data, "loader");
      return data;
    } catch (err) {
      console.error("Error fetching courses:", err);
      return [];
    }
  }

  const GetUserCourses = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/enroll/getAllEnrollcourses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setEnrollmentDetails(flattennAndRemoveDuplicates(data));
    } catch (err) {
      console.error("Error fetching enrollment details:", err);
    }
  };

  useEffect(() => {
    GetAllEnrollCourses();
    GetUserCourses();
    AdminCourses();
  }, [status]);


  const stats = useMemo(() => {
    const totalCourses = AdminCourse.length;
    const totalStudents = new Set(
      enrollmentDetails.map((enroll) => enroll.studentId)
    ).size;

    const statusCounts = enrollmentDetails.reduce((acc, enroll) => {
      acc[enroll.status] = (acc[enroll.status] || 0) + 1;
      return acc;
    }, {});

    const courseEnrollmentCounts = AdminCourse.reduce((acc, course) => {
      const enrollCount = enrollmentDetails.filter(
        (enroll) => enroll.courseId === course._id
      ).length;
      acc[course.courseName] = enrollCount; 
      return acc;
    }, {});

    return { totalCourses, totalStudents, statusCounts, courseEnrollmentCounts };
  }, [AdminCourse, enrollmentDetails]);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: "#333",
          fontStyle:"italic",
          fontSize: "2rem",
          marginLeft:"350px"
        }}
      >
        Enrollment Statistics
      </Typography>

      <Grid2 container spacing={4} justifyContent="center" sx={{ marginBottom: 4 }}  className="card1" >
  
        <Grid2 item xs={12} sm={6} md={4}>
          <Card
            className="card1"
            style={{ textAlign: "center" }}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              background: "linear-gradient(135deg, #4caf50 30%, #81c784 90%)",
            }}
          >
            <CardContent    >
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }} >
                Total Courses
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff" }}>
                {stats.totalCourses}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>

        {/* Total Students */}
        <Grid2 item xs={12} sm={6} md={4}   className="card2" >
          <Card
            style={{ textAlign: "center" }}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              background: "linear-gradient(135deg, #2196f3 30%, #64b5f6 90%)",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                Total Students
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff" }}>
                {stats.totalStudents }
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {/* Enrollment Status and Course Enrollment Counts with equal height */}
      <Grid2 container spacing={4} className="complete-table"  >
        {/* Enrollment Statuses */}
        <Grid2 item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
              height: "100%", // Ensures equal height for both tables
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Enrollment Status Distribution
            </Typography>
            <Box>
              {Object.entries(stats.statusCounts).map(([status, count]) => (
                <Box key={status} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                  <Typography
                    sx={{
                      width: 150,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "#333",
                    }}
                  >
                    {status}
                  </Typography>
                  <Box
                    sx={{
                      flexGrow: 1,
                      height: 10,
                      backgroundColor: "#4caf50",
                      borderRadius: 3,
                      marginRight: 2,
                    }}
                    style={{
                      width: `${(count / Math.max(...Object.values(stats.statusCounts))) * 100}%`,
                    }}
                  ></Box>
                  <Typography sx={{ fontSize: "1rem", color: "#333" }}>{count}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid2>

        {/* Course Enrollment Counts */}
        <Grid2 item xs={12} md={6} className="count-table"   >
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
              height: "100%", // Ensures equal height for both tables
            }}
          >
            <Typography
              variant="h6"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Course Enrollment Counts
            </Typography>
            <Box>
              {Object.entries(stats.courseEnrollmentCounts).map(([courseName, count]) => (
                <Box key={courseName} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                  <Typography
                    sx={{
                      width: 200,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "#333",
                    }}
                  >
                    {courseName}
                  </Typography>
                  <Box
                    sx={{
                      flexGrow: 1,
                      height: 10,
                      backgroundColor: "#2196f3",
                      borderRadius: 3,
                      marginRight: 2,
                    }}
                    style={{
                      width: `${(count / Math.max(...Object.values(stats.courseEnrollmentCounts))) * 100}%`,
                    }}
                  ></Box>
                  <Typography sx={{ fontSize: "1rem", color: "#333" }}>{count}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default StatsPage;

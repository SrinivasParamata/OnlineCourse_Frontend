import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Box,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from "@mui/material";
import "../Styles/AdminPage.css";


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

function AdminPage() {
  const [EnrollCourses, setEnrollCourses] = useState([]);
  const [enrollmentDetails, setEnrollmentDetails] = useState([]);
 
  const courses = useSelector((state) => state.Course.courses || []);
  const AdminCourse = useMemo(() => flattennAndRemoveDuplicates(courses), [courses]);
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
  }, [status]);

  const availableList = useMemo(() => {
    return enrollmentDetails.map((enroll) => {
      const course = AdminCourse.find((course) => course._id === enroll.courseId);
      const student = EnrollCourses.find((student) => student._id === enroll.studentId);

      return {
        courseName: course ? course.courseName : "Unknown Course",
        studentName: student ? `${student.firstName} ${student.lastName}` : "Unknown Student",
        email : student ? student.email : "No mail",
        status: enroll.status,
      };
    });
  }, [AdminCourse, EnrollCourses, enrollmentDetails]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h4 className="theader"  >MS Students Data</h4>
        <TableContainer component={Paper} sx={{ boxShadow: 2 }} className="thead" >
          <Table   >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Course Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Student Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Student Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availableList.length > 0 ? (
                availableList.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.courseName}</TableCell>
                    <TableCell>{row.studentName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: "center", fontStyle: "italic" }}>
                    No courses or students available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default AdminPage;

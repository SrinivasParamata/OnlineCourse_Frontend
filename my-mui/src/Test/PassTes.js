import React from 'react';


import "../App.css";

// Sample course data
const courses = [
  { courseId: '674c0635a58ff713a316f24c', courseName: 'React', courseDescrp: 'Learn React from basics to advanced', coursePrice: 12000, enrolled: true },
  { courseId: '674c0847a58ff713a316f24d', courseName: 'Test', courseDescrp: 'Introduction to testing', coursePrice: 15000, enrolled: false },
  { courseId: '674c08dea58ff713a316f24e', courseName: 'JavaScript', courseDescrp: 'Master JavaScript for Web Development', coursePrice: 10000, enrolled: false },
];

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-icon" style={{ backgroundColor: getRandomColor() }}>
        <span role="img" aria-label="icon">📘</span>
      </div>
      <div className="course-content">
        <div className="course-name">{course.courseName}</div>
        <div className="course-descrp">{course.courseDescrp}</div>
      </div>
      <div className="course-right">
        <div className="total">Enrolled</div>
        <div>
          <progress value={Math.floor(Math.random() * 101)} max="100"></progress>
        </div>
        <div className="bar-button">
          <button>{course.enrolled ? 'Enrolled' : 'Enroll'}</button>
        </div>
      </div>
    </div>
  );
}

function Test() {
  return (
    <div className="root">
      <div className="sidebar">
        <div className="head">
          <h4>Sidebar Menu</h4>
          <ul>
            <li><button className="active">Dashboard</button></li>
            <li><button>My Courses</button></li>
            <li><button>Settings</button></li>
            <li><button>Logout</button></li>
          </ul>
        </div>
      </div>

      <div className="main">
        <div className="courses">
          <div className="course-list">
            {courses.map((course) => (
              <CourseCard key={course.courseId} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;

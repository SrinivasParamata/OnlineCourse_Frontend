import React from 'react';
import './App.css';
import  { GetUserCourses } from './Pages/CourseList';
import MainPage from './Pages/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from './Pages/RegistrationPage';
import LoginPage ,{GetAllCourses} from "./Pages/LoginPage";
import ErrorPage from "./Pages/ErrorPage";
import PrevCourse from './Pages/PrevCourse';
import Hello from './Pages/Hello';


function App() {

  const router= createBrowserRouter([
    {
      path:"",
      element:<RegisterPage/>,
    },
    {
      path:"/hello",
      element:<Hello/>,
    },
    {
      path:"/login",
      element:<LoginPage/>,
      loader:GetAllCourses

    },
    {
      path:"/Course",
      element:<MainPage/>,
      loader:GetUserCourses
    },
    {
      path:"/prevCourse/:CourseName",
      element:<PrevCourse/>,
    },
    {
      path:"*",
      element:<ErrorPage/>
    }
  ])





  return (<>

  <RouterProvider  router={router}></RouterProvider>

  
  
  </>
  );
}

export default App;

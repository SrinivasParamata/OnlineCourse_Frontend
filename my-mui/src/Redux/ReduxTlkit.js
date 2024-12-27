import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    userDetails: {} ,
    courses: [],
    token: "",
    courseStatus:"My Learning"
};

const CreateStore= createSlice({
    name: 'Course',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload; 
          },
        addCourse: (state, action) => {
            state.courses.push(action.payload);
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setcourseStatus: (state, action) => {
            state.courseStatus = action.payload;
        },
    },
});

export const { setUserDetails, addCourse ,setcourseStatus,setEnrollCourses,setToken } = CreateStore.actions;

export default CreateStore;




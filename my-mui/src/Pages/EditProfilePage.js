import React, { useState } from "react";
import styles from "../Styles/EditProfile.module.css";
import classes from "../Styles/RegisterPage.module.css";
import ProfilePage from "./ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../Redux/ReduxTlkit";

function EditProfilePage() {
  const initialData=useSelector((state)=>state.Course.userDetails) ;
  const [profileData, setProfileData] = useState({ ...initialData});
  const [errorMsg, setErrorMsg] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const dispatch=useDispatch();
 
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  function ErrorMsgHandler(){
    setErrorMsg(false);
  }


  // Save the updated data
  const handleSave =  async() => {

    
    profileData.id = initialData._id; 


    console.log(profileData,"updated data");
    console.log(initialData,"intialdata");

    console.log(profileData,"dd",initialData);
    if (JSON.stringify(profileData) === JSON.stringify(initialData)) {
      setShowProfile(true);
    }
    else{
      
    try {
      const response = await fetch("http://localhost:8081/api/student/updateStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const data = await response.json(); // Get the error message from the response
        console.log(data,"msg",data.message);
        setErrorMsg(data.message); // Set the error message to display to the user
        setShowProfile(false);
      }
      else{
        dispatch(setUserDetails(profileData));
        setShowProfile(true);
      }
    } catch (error) {
      setShowProfile(false);
      console.error("Error saving profile:", error.message);
      setErrorMsg("An error occurred while saving your profile.");
    }
    }
  };

  return (
    <>
     {!showProfile && <>
      <div className={styles.pageContainerEdit}>
      {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
        <div className={styles.profileEditForm}>
          <div   className={styles.formGroup}>
            <label  className={styles.label}>firstName</label>
            <input
            className={styles.value}
              onFocus={ErrorMsgHandler}
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div   className={styles.formGroup}>
            <label  className={styles.label}>lastName</label>
            <input
            className={styles.value}
              onFocus={ErrorMsgHandler}
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div   className={styles.formGroup}>
            <label  className={styles.label}>email</label>
            <input
            className={styles.value}
              onFocus={ErrorMsgHandler}
              type="text"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
            />
          </div>
          <div   className={styles.formGroup}>
            <label  className={styles.label}>DOB</label>
            <input
            className={styles.value}
              onFocus={ErrorMsgHandler}
              type="date"
              name="DOB"
              value={profileData.DOB}
              onChange={handleInputChange}
            />
          </div>
          <div   className={styles.formGroup}>
            <label  className={styles.label}>phone</label>
            <input
            className={styles.value}
              onFocus={ErrorMsgHandler}
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div   className={styles.formGroup}>
            <label  className={styles.label}>Address</label>
            <input
            className={styles.value}
              onFocus={ErrorMsgHandler}
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.formGroup}>
          <button className={styles.btnvalue}  onClick={handleSave} >
              {!showProfile ? "Save" : "Saving"}
            </button>
        <button type="reset" className={styles.btnvalue} onClick={()=>setShowProfile(true)}>
          Cancel
        </button>
          </div>
        </div>
      </div>
     </>}
     {showProfile && <ProfilePage />}
    </>
  );
}

export default EditProfilePage;



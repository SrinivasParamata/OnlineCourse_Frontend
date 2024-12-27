import { useEffect, useState } from "react";
import styles from "../Styles/ProfilePage.module.css";
import EditProfilePage from "./EditProfilePage";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const {firstName, lastName, email, DOB, address, phone, password } = useSelector((state)=>state.Course.userDetails)

  const [isEditing, setIsEditing] = useState(false);

  console.log(firstName,"fname");

  // useEffect(() => {
  //   async function fetchProfile() {
  //     console.log(userName,"ooo");
  //     try {
  //       const response = await fetch(`http://localhost:8081/api/users/${userName}`, {
  //         method: "GET",
  //       });

  //       const data = await response.json();
  //       setData(data);

  //       if (!response.ok) {
  //         const errorData = await response.json(); 
  //       }
  //       else {
  //         setProfile(data);
  //     }
  // } catch (error) {
  //     // If there is any network error or other issues
  //     console.error("Error fetching profile:", error.message);
  // }
  //   }

  //   fetchProfile();
  // }, [userName]);


  // if (!profile) {
  //   return <div>Loading profile...</div>;
  // }

  return (
    <div className={styles.pageContainer}>
      {!isEditing ? (
        <>
          <h2 className={styles.title}>
            Welcome Back, {firstName}  {lastName}
          </h2>
          <div className={styles.profileEditForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>First Name:</label>
            <span className={styles.value}>{firstName}</span>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>LastName:</label>
            <span className={styles.value}>{lastName}</span>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <span className={styles.value}>{email}</span>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>D.O.B:</label>
            <span className={styles.value}>{DOB}</span>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Address:</label>
            <span className={styles.value}>{address}</span>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone:</label>
            <span className={styles.value}>{phone}</span>
          </div>
 
           <div className={styles.buttonGroup}>
              <button
                className={styles.saveButton}
                onClick={() => setIsEditing(true)} // Go to edit mode
              >
                Edit
              </button>
            </div>
          </div>
        </>
      ) : (
        <EditProfilePage
        />
      )}
    </div>
  );
}

export default ProfilePage;

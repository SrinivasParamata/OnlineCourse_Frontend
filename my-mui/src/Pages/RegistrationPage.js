import React, { useState } from "react";
import styles from "../Styles/RegisterPage.module.css";
import FormPagee from "../Pages/formpage";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [Temp ,setTemp]= useState("");
  const [formState, setFormState] = useState({
    error: false,
    errorMsg: "",
  });

  const active = formState.errorMsg === "User Registered Successfully" ? true : false;



  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
  
    // Generate the hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Convert the ArrayBuffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
  }

  function showProfileHandler(){
    setTimeout(()=>{
      navigate("/login"); 
    },900)
  }


  function clearErrorHandler() {
    setFormState((prev) => ({ ...prev, error: false, errorMsg: "" }));
  }


  async function submitHandler(formData) {
  


    const { firstName, lastName, email, DOB, address, phone, password } = formData;
    console.log(firstName,lastName,email,DOB,address,phone,password,"check");
    setTemp(password);


    if (!password || password.length < 8) {
      setFormState({ error: true, errorMsg: "Password must be at least 8 characters long." });
      return;
    }

    if (!/[a-z]/.test(password)) {
      setFormState({ error: true, errorMsg: "Password must include at least one lowercase letter." });
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setFormState({ error: true, errorMsg: "Password must include at least one uppercase letter." });
      return;
    }

    if (!/\d/.test(password)) {
      setFormState({ error: true, errorMsg: "Password must include at least one number." });
      return;
    }

    if (!/[@$!%*?&]/.test(password)) {
      setFormState({ error: true, errorMsg: "Password must include at least one special character." });
      return;
    }

    // If password is valid, hash the password
    let Haspswd = await hashPassword(password);

    const ValidFormData={...formData , password: Haspswd};


    try {
      const response = await fetch("http://localhost:8081/api/student/addStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ValidFormData),
      });

      const data = await response.text();
      console.log(data, "dataaaaaaa",response, data.message);

      if (response.ok) {
        setFormState({ error: true, errorMsg: "User Registered Successfully",  });
        showProfileHandler();

      } else {
        formData.password=Temp;
        setFormState({ error: true, errorMsg: data || "Registration failed.",});
      }
    } catch (error) {
      setFormState({
        error: true,
        errorMsg: error.message || "Something went wrong! Please try again later.",
        isLoading: false,
      });
    }
  }

  return (
    <div className={styles.pageContainer}>
      {/* Show error message */}
      {formState.error && (
  <div className={`${styles.errorBox} ${active ? styles.active : ""}`}>
    {formState.errorMsg}
  </div>
)}


      <FormPagee onSubmit={submitHandler} onErrorClear={clearErrorHandler} />
    </div>
  );
}

export default RegisterPage;


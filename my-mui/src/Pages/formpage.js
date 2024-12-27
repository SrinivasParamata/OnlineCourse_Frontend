import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/RegisterPage.module.css";
import { FormLabel } from "@mui/material";



export  const RequiredLabel = ({ children, htmlFor }) => (
  <FormLabel htmlFor={htmlFor} sx={{ fontWeight: "bold", fontSize:"17px" }}>
    {children}<span style={{ color: "red" }}>*</span>
  </FormLabel>
);


function FormPagee({ onSubmit, onErrorClear }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    DOB: "",
    address: "",
    phone: "",
    password: "",
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { firstName, lastName, email, DOB, address, phone, password } = formData;
    setIsSubmitDisabled(!(
      firstName && 
      lastName && 
      email && 
      DOB && 
      address && 
      phone && 
      password
    ));
  }, [formData]);
  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    onErrorClear?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <form className={styles.formBox} onSubmit={handleSubmit} style={{ backgroundColor: "#CAF1DE" }}>
    <h2 className={styles.title}>Register</h2>
  
    {/* First Name and Last Name Row */}
    <div className={styles.row}>
      <div className={styles.formGroup}>
        <RequiredLabel htmlFor="firstName"  required className={styles.label}>
          Firstname
        </RequiredLabel>
        <input
          id="firstName"
          type="text"
          className={styles.input}
          value={formData.firstName}
          onFocus={onErrorClear}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <RequiredLabel htmlFor="lastName"  required className={styles.label}>
          Lastname
        </RequiredLabel>
        <input
          id="lastName"
          type="text"
          className={styles.input}
          value={formData.lastName}
          onFocus={onErrorClear}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  
    {/* Email and DOB Row */}
    <div className={styles.row}>
      <div className={styles.formGroup}>
        < RequiredLabel htmlFor="email"  required className={styles.label}>
          Email
        </RequiredLabel>
        <input
          id="email"
          type="email"
          className={styles.input}
          value={formData.email}
          onFocus={onErrorClear}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <RequiredLabel htmlFor="DOB" required className={styles.label}>
          DOB
        </RequiredLabel>
        <input
          id="DOB"
          type="date"
          className={styles.input}
          value={formData.DOB}
          onFocus={onErrorClear}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  
    {/* Address and Phone Row */}
    <div className={styles.row}>
      <div className={styles.formGroup}>
        <RequiredLabel required htmlFor="address" className={styles.label}>
          Address
        </RequiredLabel>
        <textarea
          id="address"
          className={styles.input}
          value={formData.address}
          onFocus={onErrorClear}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <RequiredLabel htmlFor="phone" required className={styles.label}>
          Phone
        </RequiredLabel>
        <input
          id="phone"
          type="number"
          className={styles.input}
          value={formData.phone}
          onFocus={onErrorClear}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  
    {/* Password Row */}
    <div className={styles.row}>
      <div className={styles.formGroup}>
        <RequiredLabel required htmlFor="password" className={styles.label}>
          Password
        </RequiredLabel>
        <input
          id="password"
          type="password"
          className={styles.input}
          value={formData.password}
          onFocus={onErrorClear}
          onChange={handleInputChange}
          required
        />
        <p className={styles.passwordHint}>
          Password must have at least one special character, one number, one uppercase letter, and one lowercase letter.
        </p>
      </div>
    </div>
  
    {/* Button Group */}
    <div className={styles.buttonGroup}>
      <button
        type="submit"
        className={`${styles.btn} ${isSubmitDisabled ? styles.disabled : ""}`}
      >
        Submit
      </button>
      <button className={styles.btn} onClick={handleLogin}>
        Login
      </button>
    </div>
  </form>
  
  );
}

export default FormPagee;

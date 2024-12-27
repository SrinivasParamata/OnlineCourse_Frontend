import { useRef, useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import styles from "../Styles/RegisterPage.module.css";
import classes from "../Styles/login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../Redux/ReduxTlkit";
import { addCourse } from "../Redux/ReduxTlkit";
import { setToken } from "../Redux/ReduxTlkit";
import { RequiredLabel } from "./formpage";
import hashPassword from "./Global";

function LoginPage() {
  const loaderData = useLoaderData();

  const email = useRef();
  const password = useRef();
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const Dispatch = useDispatch();





  function resetErrorMsg() {
    setErrorMsg("");
  }

  async function submitHandler(e) {
    e.preventDefault();

    const loginCredentials = {
      email: email.current.value,
      password: await hashPassword(password.current.value),
    };

    console.log(loginCredentials, "logcred");

    try {
      const response = await fetch("http://localhost:8081/api/student/studentlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginCredentials),
      });

      if (!response.ok) {
        throw new Error("Failed to login. Please check your credentials.");
      }

      const data = await response.json();
      Dispatch(setUserDetails(data.user));
      Dispatch(setToken(data.token));

      if (data.message === "Old User") {
        Dispatch(addCourse(loaderData));
        navigate("/Course");
      } else {
        setErrorMsg(data.message || "Unexpected error occurred.");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMsg("An error occurred. Please try again later.");
    }
  }
















  return (
    <div className={classes.pageContain}>
      <form className={styles.formBox} onSubmit={submitHandler}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup} style={{ marginLeft: "330px" }}>
          <RequiredLabel htmlFor="email" className={styles.label}>
            Email
          </RequiredLabel>
          <input
            onFocus={resetErrorMsg}
            id="email"
            type="email"
            ref={email}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup} style={{ marginLeft: "330px" }}>
          <RequiredLabel htmlFor="password" className={styles.label}>
            Password
          </RequiredLabel>
          <input
            onFocus={resetErrorMsg}
            id="password"
            type="password"
            ref={password}
            className={styles.input}
            required
          />
        </div>

        {errorMsg && <div className={classes.errorMsg}>{errorMsg}</div>}

        <div className={classes.buttonGroup}>
          <button
            type="submit"
            className={classes.btn}
            style={{ textAlign: "center", marginLeft: "300px" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

export const GetAllCourses = async () => {
  try {
    const response = await fetch("http://localhost:8081/api/course/getCourses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data, "loader");
    return data;
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
};

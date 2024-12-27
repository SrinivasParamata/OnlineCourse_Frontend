import styles from "../Styles/HomePage.module.css";

function ErrorPage(){
    return(
        <>
        <p   className={styles.error} >Please enter valid data</p>
        </>
    )
}

export default ErrorPage;
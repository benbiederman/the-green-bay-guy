import styles from "./LandingPage.module.scss";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <section className={styles.landingPage}>
      <h2>Explore like a local.</h2>
      <p>
        Know the go-to places to eat, drink, and things to do in Green Bay,
        Wisconsin.
      </p>

      <Link to="/locals-guide" className={`${styles.mainBtn} primary-btn`}>
        View Local's Guide
      </Link>
    </section>
  );
};

export default LandingPage;

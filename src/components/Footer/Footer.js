import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Footer.module.scss";
import FacebookLogo from "../../images/social-media/facebook.png";
import InstagramLogo from "../../images/social-media/instagram.png";
import YoutubeLogo from "../../images/social-media/youtube.png";
import SnapchatLogo from "../../images/social-media/snapchat.png";

const Footer = () => {
  const year = new Date().getFullYear();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <footer>
      <nav>
        <ul>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/locals-guide">Local's Guide</NavLink>
          <NavLink to="/podcast">Podcast</NavLink>
        </ul>
      </nav>
      {/* Social Media Icons*/}
      <div className={styles.socials}>
        <h3>Follow Me</h3>
        <a href="https://www.facebook.com/TheGreenBayGuy" target="_blank">
          <img src={FacebookLogo} alt="Facebook Logo" />
        </a>

        <a href="https://www.instagram.com/thegreenbayguy/" target="_blank">
          <img src={InstagramLogo} alt="Instagram Logo" />
        </a>

        <a href="https://www.snapchat.com/add/thegbguy" target="_blank">
          <img src={SnapchatLogo} alt="Snapchat Logo" />
        </a>

        <a href="https://www.youtube.com/thegreenbayguy" target="_blank">
          <img src={YoutubeLogo} alt="Youtube Logo" />
        </a>
      </div>
      <p>The Green Bay Guy &copy; {year}</p>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import styles from "../Navbar/Navbar.module.scss";
import { useLocation } from "react-router";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const location = useLocation();

  function toggleNav() {
    setNavActive(!navActive);
  }

  function closeNav(e) {
    if (e.key === "Tab") {
      setNavActive(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <header>
      <button className={styles.skipBtn}>Skip to content</button>
      <img src={logo} alt="The Green Bay Guy logo" />
      <button className={styles.navBtn} aria-label="Menu" onClick={toggleNav}>
        <span>{navActive ? "Close" : "Menu"}</span>
      </button>
      <nav className={navActive ? styles.navActive : null}>
        <ul>
          <NavLink to="/" onClick={toggleNav}>
            Home
          </NavLink>
          <NavLink to="/locals-guide" onClick={toggleNav}>
            Local's Guide
          </NavLink>
          <NavLink to="/podcast" onClick={toggleNav} onKeyDown={closeNav}>
            Podcast
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

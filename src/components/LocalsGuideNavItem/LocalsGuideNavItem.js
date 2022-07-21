import { Link, useNavigate } from "react-router-dom";
import styles from "./LocalsGuideNavItem.module.scss";

const LocalsGuideNavItem = (props) => {
  let navigate = useNavigate();

  function sectionHandler(link) {
    navigate(`/locals-guide/${link}`);
  }

  function keyHandler(e) {
    if (e.key === "Enter") {
      navigate(`/locals-guide/${props.link}`);
    }
  }

  return (
    <section
      className={`${props.background} ${styles.lgNavItem}`}
      onClick={() => sectionHandler(props.link)}
      onKeyDown={keyHandler}
      tabIndex={0}
    >
      <h3>{props.header}</h3>
    </section>
  );
};

export default LocalsGuideNavItem;

import styles from "./Divider.module.scss";

const Divider = (props) => {
  return <div className={`${styles.divider} ${props.color}`}></div>;
};

export default Divider;

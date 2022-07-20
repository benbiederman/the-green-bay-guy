import Post from "../Post/Post";
import styles from "./PostSuggestion.module.scss";

const PostSuggestion = (props) => {
  return (
    <section
      className={
        props.main
          ? `${styles.mainSuggestion} ${props.color}`
          : `${styles.suggestion} ${props.color}`
      }
    >
      <h3>{props.header}</h3>
      <Post />
      <Post />
      <Post />
      <Post />
    </section>
  );
};

export default PostSuggestion;

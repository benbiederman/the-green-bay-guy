import styles from "./Post.module.scss";

const Post = () => {
  const rating = 4.75;

  return (
    <article className={styles.post} tabIndex={0}>
      <img
        src={require("../../images/locals-guide/eat/lunch/legend-larrys.jpg")}
        alt="Test image"
      />
      <h1>Legend Larry's</h1>
      {rating && <p>{rating}/5.0</p>}
      <p>- Read More -</p>
    </article>
  );
};

export default Post;

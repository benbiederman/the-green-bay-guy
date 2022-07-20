import styles from "./About.module.scss";

const About = (props) => {
  return (
    <section className={`${styles.about} ${props.color}`}>
      <img src={require("../../images/ben.jpg")} />
      <div className={styles.aboutSection}>
        <h3>About Me</h3>
        <p>
          Hi, I’m Ben. I started The Green Bay Guy in October 2017 as a way of
          helping individuals who are coming to Green Bay have a better
          understanding of all the amazing places to eat, drink, or see while in
          town. I never imagined it’d grow into what it is today. Thanks to
          starting this project I’ve been fortunate enough to meet a lot of
          amazing people, hear some great stories, and learn my city even
          better.
        </p>
        <p>
          I welcome you to listen to some fan stories that I’ve been fortunate
          enough to capture or check out some great places my city has to offer.
          I appreciate you stopping by my website.
        </p>
      </div>
    </section>
  );
};

export default About;

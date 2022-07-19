import LandingPage from "../components/LandingPage/LandingPage";
import PostSuggestion from "../components/PostSuggestion/PostSuggestion";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { data, error } = useFetch("http://localhost:8000/blogs");

  return (
    <main>
      <LandingPage />
      <PostSuggestion
        color={"dark"}
        header={"Coming to Green Bay? These may help."}
      />
    </main>
  );
};

export default Home;

import LandingPage from "../components/LandingPage/LandingPage";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { data, error } = useFetch("http://localhost:8000/blogs");

  return (
    <main>
      <LandingPage />
    </main>
  );
};

export default Home;

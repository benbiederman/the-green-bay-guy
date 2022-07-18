import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import NotFound from "../pages/NotFound";

const LocalsGuidePost = () => {
  const { id } = useParams();
  const { data, error } = useFetch("http://localhost:8000/blogs/" + id);

  return (
    <>
      {error && <NotFound />}
      {data && (
        <div>
          <h1>{data.title}</h1>
          <p>{data.body}</p>
        </div>
      )}
    </>
  );
};

export default LocalsGuidePost;

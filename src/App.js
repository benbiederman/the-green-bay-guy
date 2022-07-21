import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import LocalsGuide from "./pages/LocalsGuide";
import LocalsGuidePage from "./pages/LocalsGuidePage";
import LocalsGuidePost from "./pages/LocalsGuidePost";
import NotFound from "./pages/NotFound";
import Podcast from "./pages/Podcast";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locals-guide" element={<LocalsGuide />} />
        <Route
          path="/locals-guide/eat"
          element={<LocalsGuidePage greeting="Eat Suggestions" />}
        />
        <Route
          path="/locals-guide/drink"
          element={<LocalsGuidePage greeting="Drink Suggestions" />}
        />
        <Route
          path="/locals-guide/do"
          element={<LocalsGuidePage greeting="Do Suggestions" />}
        />
        <Route path="/podcast" element={<Podcast />} />
        <Route path="/locals-guide/:id" element={<LocalsGuidePost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

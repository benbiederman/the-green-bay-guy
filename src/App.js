import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import LocalsGuide from "./pages/LocalsGuide";
import Podcast from "./pages/Podcast";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locals-guide" element={<LocalsGuide />} />
        <Route path="/podcast" element={<Podcast />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

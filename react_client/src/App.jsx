import { Route, Routes } from "react-router-dom";

// MAIN Routes
import Layout from "./components/nav_layout/Layout"; // All page routes are wrapped within the Nav Layout
import Main from "./pages/LandingPage";

/* Additional Routes for Custom Pages */
import DialoGPT from "./components/dialogpt/DialoGPT";
import MistralAI from "./components/mistralai/MistralAI";
import FaceBookBlender from "./components/fb_blender/FaceBookBlender";
import Zephyr from "./components/zephyr/Zephyr";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="dialogpt" element={<DialoGPT />} />
          <Route path="mistralai" element={<MistralAI />} />
          <Route path="fb_blender" element={<FaceBookBlender />} />
          <Route path="zephyr" element={<Zephyr />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

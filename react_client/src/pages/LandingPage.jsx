import MistralAI from "../components/mistralai/MistralAI";
import DialoGPT from "../components/dialogpt/DialoGPT"
import FaceBookBlender from "../components/fb_blender/FaceBookBlender"
import { useState } from "react";

// getChatBot is an idea that will allow a single page view
// and the ability to select a chatbot from a dropdown menu
const getChatbot = (chatbot) => {

  switch (chatbot) {
    case 'dialogpt':
      return <DialoGPT />
    case 'fb_blender':
      return <FaceBookBlender />
    case 'mistralai':
      return <MistralAI />
    case 'zephyr':
      return <Zephyr />
    default: 
      return <MistralAI />
  }
}

function Main() {

  const [chatBot, setChatBot] = useState(<MistralAI />);
  return (
    <>
      <div className="landingpage-container mt-3 w-75">
        {chatBot}
        {/* <div className="dropdown">
          <button className="dropdown w-25">Select</button>
        </div> */}
      </div>
    </>
  );
}

export default Main;

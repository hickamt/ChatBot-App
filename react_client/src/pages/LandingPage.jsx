import MistralAI from "../components/mistralai/MistralAI";
import DialoGPT from "../components/dialogpt/DialoGPT"
import FaceBookBlender from "../components/fb_blender/FaceBookBlender"
import Zephyr from "../components/zephyr/Zephyr";
import EleutherAI from "../components/eleuther/EleutherAI";
import TextToSpeech from "../components/speech/TextToSpeech";
import { useState } from "react";

// getChatBot is an idea that will allow a single page view
// and the ability to select a chatbot from a dropdown menu
const getChatbot = (chatbot) => {

  switch (chatbot) {
    case 'dialogpt':
      return <DialoGPT />
    case 'eleuther':
      return <EleutherAI />
    case 'fb_blender':
      return <FaceBookBlender />
    case 'mistralai':
      return <MistralAI />
    case 'zephyr':
      return <Zephyr />
    default: 
      return <EleutherAI />
  }
}

function Main() {

  const [chatBot, setChatBot] = useState(<EleutherAI />);
  return (
    <>
      <div className="landingpage-container mt-3 w-75">
        {chatBot}
      </div>
    </>
  );
}

export default Main;

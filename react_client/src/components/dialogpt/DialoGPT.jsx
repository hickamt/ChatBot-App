import { useState } from "react";
import "../../styles/message_field.css";
// import DialoMessages from "./sub_compt/DialoMessages";

// Add the following imports for Messages abstraction
import Messages from "../messages/Messages";
import { dialoHistory } from "../../prompts/dialogpt";
import dialoAPI from "../../api/dialoAPI";

function DialoGPT() {
  document.getElementById("root").style.backgroundImage =
    "url(https://wallpapercave.com/wp/wp4063812.png)";

  const [isData, setIsData] = useState(false); // This is used to determine whether to display the chatbot response
  const [messageHistory, setMessageHistory] = useState([]); // This is used to store the chatbot response
  const [formValue, setFormValue] = useState(""); // user input

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    await dialoAPI([formValue], setMessageHistory, setIsData);
    setFormValue("");
  };

  return (
    <>
      <h1 className="message-title">DialoGPT | Chat Abot Anything</h1>
      <div className="message-main">
        {/* <DialoMessages /> */}
        <Messages
          isData={isData}
          messageHistory={messageHistory}
          formValue={formValue}
          handleInputSubmit={handleInputSubmit}
          setFormValue={setFormValue}
          dialoHistory={dialoHistory}></Messages>
      </div>
    </>
  );
}

export default DialoGPT;

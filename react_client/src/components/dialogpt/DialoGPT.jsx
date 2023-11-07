import { useState } from "react";
import { dialoHistory } from "../../prompts/dialogpt";
import Messages from "../messages/Messages";
import dialoAPI from "../../api/dialoAPI";
import "../../styles/messages.css";

function DialoGPT() {
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
      <h1 className="message-title">DialoGPT</h1>
      <div className="message-main">
        <Messages
          isData={isData}
          messageHistory={messageHistory}
          formValue={formValue}
          handleInputSubmit={handleInputSubmit}
          setFormValue={setFormValue}
          initialMessage={dialoHistory}></Messages>
      </div>
    </>
  );
}

export default DialoGPT;

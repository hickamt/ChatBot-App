import { useState } from "react";
import { blenderHistory } from "../../prompts/blender";
import Messages from "../messages/Messages";
import blenderAPI from "../../api/blenderAPI";
import "../../styles/messages.css";

function FaceBookBlenderMessages() {
  const [isData, setIsData] = useState(false); // This is used to determine whether to display the chatbot response
  const [messageHistory, setMessageHistory] = useState([]); // This is used to store the chatbot response
  const [formValue, setFormValue] = useState(""); // user input

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    await blenderAPI(formValue, setMessageHistory, setIsData);
    setFormValue("");
  };
  return (
    <>
      <h1 className="message-title">FB Blender</h1>
      <div className="message-main">
        <Messages
          isData={isData}
          messageHistory={messageHistory}
          formValue={formValue}
          handleInputSubmit={handleInputSubmit}
          setFormValue={setFormValue}
          initialMessage={blenderHistory}></Messages>
      </div>
    </>
  );
}

export default FaceBookBlenderMessages;

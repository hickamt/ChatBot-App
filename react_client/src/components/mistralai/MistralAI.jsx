import { useState } from "react";
import { mistralHistory } from "../../prompts/mistralai";
import Messages from "../messages/Messages";
import mistralAPI from "../../api/mistralAPI";

function MistralAI() {
  const [isData, setIsData] = useState(false); // This is used to determine whether to display the chatbot response
  const [messageHistory, setMessageHistory] = useState([]); // This is used to store the chatbot response
  const [formValue, setFormValue] = useState(""); // user input

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    await mistralAPI(formValue, setMessageHistory, setIsData);
    setFormValue("");
  };

  return (
    <>
      <h1 className="message-title">MistralAI</h1>
      <div className="message-main">
        <Messages
          isData={isData}
          messageHistory={messageHistory}
          formValue={formValue}
          handleInputSubmit={handleInputSubmit}
          setFormValue={setFormValue}
          initialMessage={mistralHistory}></Messages>
      </div>
    </>
  );
}

export default MistralAI;

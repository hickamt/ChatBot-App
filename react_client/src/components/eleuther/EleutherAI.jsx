import { useState } from "react";
import { eleutherHistory } from "../../prompts/eleuther";
import Messages from "../messages/Messages";
import eleutherAPI from "../../api/eleutherAPI";

function EleutherAI() {
  const [isData, setIsData] = useState(false); // This is used to determine whether to display the chatbot response
  const [messageHistory, setMessageHistory] = useState([]); // This is used to store the chatbot response
  const [formValue, setFormValue] = useState(""); // user input

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    await eleutherAPI(formValue, setMessageHistory, setIsData);
    setFormValue("");
  };

  return (
    <>
      <h1 className="message-title">Eleuther AI Chat</h1>
      <div className="message-main">
        <Messages
          isData={isData}
          messageHistory={messageHistory}
          formValue={formValue}
          handleInputSubmit={handleInputSubmit}
          setFormValue={setFormValue}
          initialMessage={eleutherHistory}></Messages>
      </div>
    </>
  );
}

export default EleutherAI;

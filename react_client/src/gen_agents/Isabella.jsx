/**
 * Isabella: using the zephyr model
 * Isabella is 
 */
import { useState } from "react";
import {zephyrHistory} from "../../prompts/zephyr"
import zephyrAPI from "../../api/zephyrAPI";
import Messages from "../messages/Messages";

function Zephyr() {
  const [isData, setIsData] = useState(false); // This is used to determine whether to display the chatbot response
  const [messageHistory, setMessageHistory] = useState([]); // This is used to store the chatbot response
  const [formValue, setFormValue] = useState(""); // user input

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    await zephyrAPI(formValue, setMessageHistory, setIsData);
    setFormValue("");
  };

  return (
    <>
      <h1 className="message-title">Zephyr</h1>
      <div className="message-main">
        <Messages
          isData={isData}
          messageHistory={messageHistory}
          formValue={formValue}
          handleInputSubmit={handleInputSubmit}
          setFormValue={setFormValue}
          initialMessage={zephyrHistory}></Messages>
      </div>
    </>
  );
}

export default Zephyr;

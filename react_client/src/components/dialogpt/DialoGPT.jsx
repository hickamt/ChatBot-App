import { useState } from "react";
import { dialoHistory } from "../../prompts/dialogpt";
import Messages from "../messages/Messages";
import dialoAPI from "../../api/dialoAPI";
import PageHeader from "../header/PageHeader";
import "../../styles/messages.css";
import SpeechToText from "../speech/TextToSpeech";

function DialoGPT() {
  const [isLoading, setIsLoading] = useState(false); // This is used to determine whether to display the chatbot response
  const [isData, setIsData] = useState(false); // This is used to determine whether to display the chatbot response
  const [messageHistory, setMessageHistory] = useState([]); // This is used to store the chatbot response
  const [formValue, setFormValue] = useState(""); // user input

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await dialoAPI([formValue], setMessageHistory, setIsData);
    setIsLoading(false);
    setFormValue("");
  };

  return (
    <>
      <PageHeader title="DialoGPT" isLoading={isLoading} />
      <div className="message-main">
        <Messages
          isData={isData}
          messageHistory={messageHistory}
          formValue={formValue}
          handleInputSubmit={handleInputSubmit}
          setFormValue={setFormValue}
          initialMessage={dialoHistory}></Messages>
      </div>
      <SpeechToText message={messageHistory[messageHistory.length - 1]} />
    </>
  );
}

export default DialoGPT;

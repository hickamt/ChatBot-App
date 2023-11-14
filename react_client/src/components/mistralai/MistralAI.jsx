import { useState } from "react";
import { mistralHistory } from "../../prompts/mistralai";
import Messages from "../messages/Messages";
import mistralAPI from "../../api/mistralAPI";
import PageHeader from "../header/PageHeader";
import SpeechToText from "../speech/TextToSpeech";

function MistralAI() {
  const [isLoading, setIsLoading] = useState(false); // This is used to determine whether to display the chatbot response
  const [isData, setIsData] = useState(false); // This is used to determine whether to display the chatbot response
  const [messageHistory, setMessageHistory] = useState([]); // This is used to store the chatbot response
  const [formValue, setFormValue] = useState(""); // user input

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    await mistralAPI(formValue, setMessageHistory, setIsData);
    setIsLoading(false);
    setFormValue("");
  };

  return (
    <>
      <PageHeader title="MistralAI" isLoading={isLoading} />
      <div className="message-main">
        <Messages
          isData={isData}
          messageHistory={messageHistory}
          formValue={formValue}
          handleInputSubmit={handleInputSubmit}
          setFormValue={setFormValue}
          initialMessage={mistralHistory}
          isLoading={isLoading}
          setIsLoading={setIsLoading}></Messages>
      </div>
      <SpeechToText message={messageHistory[messageHistory.length - 1]} />
    </>
  );
}

export default MistralAI;

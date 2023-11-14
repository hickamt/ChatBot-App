import { useState } from "react";
import { blenderHistory } from "../../prompts/blender";
import Messages from "../messages/Messages";
import blenderAPI from "../../api/blenderAPI";
import "../../styles/messages.css";
import PageHeader from "../header/PageHeader";
import SpeechToText from "../speech/TextToSpeech";

function FaceBookBlenderMessages() {
  const [isLoading, setIsLoading] = useState(false); // This is used to determine whether to display the chatbot response
  const [isData, setIsData] = useState(false); // This is used to determine whether to display the chatbot response
  const [messageHistory, setMessageHistory] = useState([]); // This is used to store the chatbot response
  const [formValue, setFormValue] = useState(""); // user input

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await blenderAPI(formValue, setMessageHistory, setIsData);
    setIsLoading(false);
    setFormValue("");
  };
  return (
    <>
      <PageHeader title="FB Blender" isLoading={isLoading} />
      <div className="message-main">
        <Messages
          isData={isData}
          messageHistory={messageHistory}
          formValue={formValue}
          handleInputSubmit={handleInputSubmit}
          setFormValue={setFormValue}
          initialMessage={blenderHistory}
          isLoading={isLoading}
          setIsLoading={setIsLoading}></Messages>
      </div>
      <SpeechToText message={messageHistory[messageHistory.length - 1]} />
    </>
  );
}

export default FaceBookBlenderMessages;

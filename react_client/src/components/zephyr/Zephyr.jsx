import { useState } from "react";
import { zephyrHistory } from "../../prompts/zephyr";
import zephyrAPI from "../../api/zephyrAPI";
import Messages from "../messages/Messages";
import PageHeader from "../header/PageHeader";
import SpeechToText from "../speech/TextToSpeech";

function Zephyr() {
  const [isLoading, setIsLoading] = useState(false); // This is used to determine whether to display the chatbot response
  const [isData, setIsData] = useState(false); // This is used to determine whether to display the chatbot response
  const [messageHistory, setMessageHistory] = useState([]); // This is used to store the chatbot response
  const [formValue, setFormValue] = useState(""); // user input
  const [textToSpeech, setTextToSpeech] = useState([]);

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await zephyrAPI(formValue, setMessageHistory, setIsData, setTextToSpeech);
    setIsLoading(false);
    setFormValue("");
    setTextToSpeech(messageHistory[-1])
    // console.log("Zephyr Message History: ", messageHistory)
  };

  return (
    <>
      <PageHeader title="Zephyr" isLoading={isLoading} />
      <div className="message-main">
        <Messages
          isData={isData}
          messageHistory={messageHistory}
          formValue={formValue}
          handleInputSubmit={handleInputSubmit}
          setFormValue={setFormValue}
          initialMessage={zephyrHistory}
          isLoading={isLoading}
          setIsLoading={setIsLoading}></Messages>
      </div>
      <SpeechToText message={messageHistory[messageHistory.lenght - 2]} />
    </>
  );
}

export default Zephyr;

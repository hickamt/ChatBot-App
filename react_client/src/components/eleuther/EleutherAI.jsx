import { useState } from "react";
import { eleutherHistory } from "../../prompts/eleuther";
import Messages from "../messages/Messages";
import eleutherAPI from "../../api/eleutherAPI";
import PageHeader from "../header/PageHeader";

function EleutherAI() {
  const [isLoading, setIsLoading] = useState(false); // This is used to determine whether to display the chatbot response
  const [isData, setIsData] = useState(false); // This is used to determine whether to display the chatbot response
  const [messageHistory, setMessageHistory] = useState([]); // This is used to store the chatbot response
  const [formValue, setFormValue] = useState(""); // user input

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await eleutherAPI(formValue, setMessageHistory, setIsData);
    setIsLoading(false);
    setFormValue("");
  };

  return (
    <>
      <PageHeader title="EleutherAI" isLoading={isLoading} />
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

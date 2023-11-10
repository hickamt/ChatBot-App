/**
 * Two chat bots will communicate together using the response
 * from the first chatbot as the input for the second chatbot.
 * The first chatbot will be MistralAI and the second chatbot
 * will be Zephyr
 */
import { useState, useEffect } from "react";

// The Messages component will be used by both chatbots
import Messages from "../components/messages/Messages";

// Socrates will use the ZephyrAPI to generate responses for Nietzsche
import zephyrAPI from "../api/zephyrAPI";
import { socratesPersona } from "./personas/Socrates";

// Nietzsche will use the MystralAI API to generate responses for Socrates
import mistralAPI from "../api/mistralAPI";
// import { nietzschePersona } from "./personas/Nietzsche";

function GenAI() {
  const [isSocratesData, setisSocratesData] = useState(false); // This is used to determine whether to display the chatbot response
  const [SocratesMessage, setSocratesMessage] = useState([]); // This is used to store the chatbot response
  const [SocratesUserInput, setSocratesUserInput] = useState(""); // user input

  const [isNietzscheData, setIsNietzscheData] = useState(false); // This is used to determine whether to display the chatbot response
  const [nietzscheMessage, setNietzscheMessage] = useState([]); // This is used to store the chatbot response
  const [nietzscheUserInput, setNietzscheUserInput] = useState(""); // user input
  const [isFirstIntro, setIsFirstIntro] = useState(true); // This is used to display the introduction only once for Nietzsche

  // MAX_CALLS is used to prevent an infinite loop of API calls
  // between the two chatbots
  const MAX_CALLS = 5;
  let apiCallCounter = 0;

  useEffect(() => {
    handleSocratesCall(socratesPersona.introduction);
  }, []);

  // Takes user input and calls the API for Socrates's response
  const handleSocratesCall = async (message) => {
    console.log("Socrates's received message: ", message);
    let response = await zephyrAPI(
      message,
      setSocratesMessage,
      setisSocratesData
    );
    if (apiCallCounter === MAX_CALLS) return;
    ++apiCallCounter;
    console.log("Socrates API Call Counter after call && increment: ", apiCallCounter);

    if (response) {
      handleNietzscheCall(response);
    }
    setSocratesUserInput("");
  };

  // Takes user input and calls the API for Nietzsche's response
  const handleNietzscheCall = async (message) => {
    console.log("Nietzsches's received message: ", message);
    if (isFirstIntro) {
      message += nietzschePersona.introduction;
      setIsFirstIntro(false);
    }
    let response = await mistralAPI(message, setNietzscheMessage, setIsNietzscheData);
    if (apiCallCounter === MAX_CALLS) return;
    ++apiCallCounter;
    console.log("Nietzsche API Call Counter after call && increment: ", apiCallCounter);

    if (response) {
      handleSocratesCall(response);
    }
    setNietzscheUserInput("");
  };

  return (
    <>
      <div className="message-main d-flex justify-content-center">
        <div className="Socrates-container text-center">
          <h1 className="Socrates-title">Socrates</h1>
          <Messages
            isData={isSocratesData}
            messageHistory={SocratesMessage}
            formValue={SocratesUserInput}
            handleInputSubmit={handleSocratesCall}
            setFormValue={setSocratesUserInput}
            initialMessage={socratesPersona.introduction}></Messages>
        </div>
        <div className="nietzsche-container text-center">
          <h1 className="Socrates-title">Nietzsche</h1>
          <Messages
            isData={isNietzscheData}
            messageHistory={nietzscheMessage}
            formValue={nietzscheUserInput}
            handleInputSubmit={handleNietzscheCall}
            setFormValue={setNietzscheUserInput}
            initialMessage={nietzschePersona.introduction}></Messages>
        </div>
      </div>
    </>
  );
}

export default GenAI;

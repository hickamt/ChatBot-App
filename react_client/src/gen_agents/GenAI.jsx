/**
 * Two chat bots will communicate together using the response
 * from the first chatbot as the input for the second chatbot.
 * The first chatbot will be MistralAI and the second chatbot
 * will be Zephyr
 */
import { useState, useEffect } from "react";

// The Messages component will be used by both chatbots
import Messages from "../components/messages/Messages";

// Socrates will use the ZephyrAPI to generate responses for Alex
import zephyrAPI from "../api/zephyrAPI";
import { socratesBackground } from "./personas/Socrates";

// Alex will use the MystralAI API to generate responses for Socrates
import mistralAPI from "../api/mistralAPI";
import { alexBackground } from "./personas/Alex";

function GenAI() {
  const [isSocratesData, setisSocratesData] = useState(false); // This is used to determine whether to display the chatbot response
  const [SocratesMessage, setSocratesMessage] = useState([]); // This is used to store the chatbot response
  const [SocratesUserInput, setSocratesUserInput] = useState(""); // user input

  const [isAlexData, setIsAlexData] = useState(false); // This is used to determine whether to display the chatbot response
  const [alexMessage, setAlexMessage] = useState([]); // This is used to store the chatbot response
  const [alexUserInput, setAlexUserInput] = useState(""); // user input

  // MAX_CALLS is used to prevent an infinite loop of API calls
  // between the two chatbots
  const MAX_CALLS = 5;
  let apiCallCounter = 0;

  useEffect(() => {
    handleSocratesCall(socratesBackground.welcome);
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
      handleAlexCall(response);
    }
    setSocratesUserInput("");
  };

  // Takes user input and calls the API for Alex's response
  const handleAlexCall = async (message) => {
    console.log("Alex's received message: ", message);
    let response = await mistralAPI(message, setAlexMessage, setIsAlexData);
    if (apiCallCounter === MAX_CALLS) return;
    ++apiCallCounter;
    console.log("Alex API Call Counter after call && increment: ", apiCallCounter);

    if (response) {
      handleSocratesCall(response);
    }
    setAlexUserInput("");
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
            initialMessage={socratesBackground.welcome}></Messages>
        </div>
        <div className="alex-container text-center">
          <h1 className="Socrates-title">Alex</h1>
          <Messages
            isData={isAlexData}
            messageHistory={alexMessage}
            formValue={alexUserInput}
            handleInputSubmit={handleAlexCall}
            setFormValue={setAlexUserInput}
            initialMessage={alexBackground.welcome}></Messages>
        </div>
      </div>
    </>
  );
}

export default GenAI;

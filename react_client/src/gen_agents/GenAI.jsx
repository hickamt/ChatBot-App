/**
 * Two chat bots will communicate together using the response
 * from the first chatbot as the input for the second chatbot.
 * The first chatbot will be MistralAI and the second chatbot
 * will be Zephyr
 */
import { useState, useRef, useEffect } from "react";

// The Messages component will be used by both chatbots
import Messages from "../components/messages/Messages";

// Isabella will use the ZephyrAPI to generate responses for Alex
import zephyrAPI from "../api/zephyrAPI";
import { isabellaBackground } from "./personas/Isabella";

// Alex will use the MystralAI API to generate responses for Isabella
import mistralAPI from "../api/mistralAPI";
import { alexBackground } from "./personas/Alex";

function GenAI() {
  const [isIsabellaData, setisIsabellaData] = useState(false); // This is used to determine whether to display the chatbot response
  const [isabellaMessage, setIsabellaMessage] = useState([]); // This is used to store the chatbot response
  const [isabellaUserInput, setIsabellaUserInput] = useState(""); // user input

  const [isAlexData, setIsAlexData] = useState(false); // This is used to determine whether to display the chatbot response
  const [alexMessage, setAlexMessage] = useState([]); // This is used to store the chatbot response
  const [alexUserInput, setAlexUserInput] = useState(""); // user input

  const intervalId = useRef(null);

  useEffect(() => {
    handleIsabellaCall(isabellaBackground.welcome);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  // Takes user input and calls the API for Isabella's response
  const handleIsabellaCall = async (input) => {
    // e.preventDefault();
    await zephyrAPI(input, setIsabellaMessage, setisIsabellaData);
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      handleAlexCall(isabellaMessage);
    }, 5000);
    setIsabellaUserInput("");
  };

  // Takes user input and calls the API for Alex's response
  const handleAlexCall = async (input) => {
    // e.preventDefault();
    await mistralAPI(input, setAlexMessage, setIsAlexData);
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      handleIsabellaCall(alexMessage);
    }, 5000);
    setAlexUserInput("");
  };

  return (
    <>
      <div className="message-main d-flex justify-content-center">
        <div className="isabella-container text-center">
          <h1 className="isabella-title">Isabella</h1>
          <Messages
            isData={isIsabellaData}
            messageHistory={isabellaMessage}
            formValue={isabellaUserInput}
            handleInputSubmit={handleIsabellaCall}
            setFormValue={setIsabellaUserInput}
            initialMessage={isabellaBackground.welcome}></Messages>
        </div>
        <div className="alex-container text-center">
          <h1 className="isabella-title">Alex</h1>
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

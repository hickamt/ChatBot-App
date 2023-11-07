import { useState } from "react";
import { blenderHistory } from "../../../prompts/blender";
import blenderAPI from "../../../api/blenderAPI";

// eslint-disable-next-line react/prop-types
const ChatMessage = function CreateChatMessage({ text, classtitle }) {
  return (
    <>
      <div className={`message ${classtitle} justify-content-end`}>
        <p className={`message-text ${classtitle}`}>{text}</p>
      </div>
    </>
  );
};

/**
 * Function used to set the class name for the text message element
 * The names 'user' and 'blender' are used for styles in .css
 * @param {number} index
 * @returns either 'user' or 'blender' based on even or odd index
 */
const filterClassName = function filterIndexForUserOrChatbotClassName(index) {
  return index % 2 === 0 ? "user" : "chatbot";
};

const BlenderMessages = function TextMessageField() {
  const [isData, setIsData] = useState(false); // This is used to determine whether to display the chatbot response
  const [messageHistory, setMessageHistory] = useState([]); // This is used to store the chatbot response
  const [formValue, setFormValue] = useState(""); // user input

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    await blenderAPI(formValue, setMessageHistory, setIsData);
    setFormValue("");
  };

  return (
    <div className="message-container">
      <main className="messages">
        <div className="messages-div">
          <ChatMessage text={blenderHistory} classtitle={"user"} />
          {isData &&
            messageHistory &&
            messageHistory.map((msg, index) => (
              <ChatMessage
                key={index}
                text={msg}
                classtitle={filterClassName(index)}
              />
            ))}
        </div>
      </main>
      <form action="" onSubmit={(e) => handleInputSubmit(e)}>
        <label htmlFor="prompt-input" className="input-label"></label>
        <textarea
          value={formValue}
          placeholder="Let's chat! ..."
          id="prompt-input"
          rows="2"
          cols="30"
          onChange={(e) => setFormValue(e.target.value)}></textarea>
        <div className="btn-div d-flex flex-column mx-auto w-25">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BlenderMessages;

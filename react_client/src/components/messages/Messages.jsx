import "../../styles/messages.css";

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
 * The names 'user' and 'chatbot' are class name identifiers for the .css styles
 * @param {number} index
 * @returns 'user' if the index is even, 'chatbot' if the index is odd
 */
const filterClassName = function filterIndexForUserOrChatbotClassName(index) {
  return index % 2 === 0 ? "user" : "chatbot";
};

const Messages = function TextMessageField({
  isData,
  messageHistory,
  formValue,
  handleInputSubmit,
  setFormValue,
  initialMessage,
}) {
  return (
    <pre className="pre-wrap">
      <div className="message-container">
        <main className="messages">
          <div className="messages-div">
            {!isData && <ChatMessage text={initialMessage} classtitle={"user"} />}
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
            cols="40"
            onChange={(e) => setFormValue(e.target.value)}></textarea>
          <div className="btn-div d-flex flex-column mx-auto w-25">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </pre>
  );
};

export default Messages;

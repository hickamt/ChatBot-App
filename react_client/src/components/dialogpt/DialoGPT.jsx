import DialoMessages from "./sub_compt/DialoMessages";
import "../../styles/message_field.css";

function DialoGPT() {
  document.getElementById("root").style.backgroundImage =
    "url(https://1.bp.blogspot.com/-dRoOAUqWNmg/UupI4Y3LngI/AAAAAAAAP5c/QFHzclGY1D8/s1600/sprite+background+mugen+0043.gif)";

  return (
    <>
      <h1 className="message-title">DialoGPT | Chat Abot Anything</h1>
      <div className="message-main">
        <div className="game rounded">
          <p className="temp-text text-center mt-5 fs-3 fw-bold">
            Some Game Shit Goes Here
          </p>
        </div>
        <DialoMessages />
      </div>
    </>
  );
}

export default DialoGPT;

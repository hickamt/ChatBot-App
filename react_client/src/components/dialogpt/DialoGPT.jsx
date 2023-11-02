import Game from "../../game/Game";
import DialoMessages from "./sub_compt/DialoMessages";
import "../../styles/message_field.css";

function DialoGPT() {
  document.getElementById("root").style.backgroundImage =
    "url(https://1.bp.blogspot.com/-dRoOAUqWNmg/UupI4Y3LngI/AAAAAAAAP5c/QFHzclGY1D8/s1600/sprite+background+mugen+0043.gif)";

  return (
    <>
      <h1 className="message-title">DialoGPT | Chat Abot Anything</h1>
      <div className="message-main">
        <Game />
        <DialoMessages />
      </div>
    </>
  );
}

export default DialoGPT;
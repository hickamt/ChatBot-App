import Game from "../../game/Game";
import MistralMessages from "./sub_compt/MistralMessages";
import "../../styles/message_field.css";

function MistralAI() {
  document.getElementById("root").style.backgroundImage =
    "url(https://4.bp.blogspot.com/-8hAlTAzmKVI/UieFnUsG6cI/AAAAAAAAO8M/E_WOooNRGAg/s1600/Sprite_background_effects_0125.gif)";
  return (
    <>
      <h1 className="message-title">MistralAI | Chat Abot Anything</h1>
      <div className="message-main">
        <Game />
        <MistralMessages />
      </div>
    </>
  );
}

export default MistralAI;

import BlenderMessages from "./sub_compt/BlenderMessages";
import "../../styles/message_field.css";

function FaceBookBlenderMessages() {
  document.getElementById("root").style.backgroundImage =
    "url(https://i.pinimg.com/originals/45/90/67/4590676926a11158e2bb5b087d881f34.gif)";
  return (
    <>
      <h1 className="message-title">FB Blender | Chat Abot Anything</h1>
      <div className="message-main">
        <div className="game rounded">
          <p className="temp-text text-center mt-5 fs-3 fw-bold">
            Some Game Shit Goes Here
          </p>
        </div>
        <BlenderMessages />
      </div>
    </>
  );
}

export default FaceBookBlenderMessages;

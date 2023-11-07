import BlenderMessages from "./sub_compt/BlenderMessages";
import "../../styles/messages.css"

function FaceBookBlenderMessages() {
  document.getElementById("root").style.backgroundImage =
  "url(https://www.wallpapertip.com/wmimgs/99-994369_artificial-intelligence-wallpaper-1080p.jpg)"
  // "url(https://wallpapercave.com/wp/wp2316798.jpg)"
    // "url(https://i.pinimg.com/originals/45/90/67/4590676926a11158e2bb5b087d881f34.gif)";
  return (
    <>
      <h1 className="message-title">FB Blender | Chat Abot Anything</h1>
      <div className="message-main">
        <BlenderMessages />
      </div>
    </>
  );
}

export default FaceBookBlenderMessages;

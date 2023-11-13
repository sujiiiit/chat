// ChatApp.js

import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import Svg from "./Svg";
import "../css/style.css";
import "../css/bubble.css";
import "../css/ico.css";

const ChatApp = () => {
  // Set up state if needed

  return (
    <>
    <div className="whole">
      {/* <LeftColumn /> */}
      <RightColumn />
      <Svg />
    </div>
    </>
  );
};



export default ChatApp;

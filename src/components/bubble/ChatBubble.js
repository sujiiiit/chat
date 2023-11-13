// ChatBubble.js
const ChatBubble = (props) => {
    const isFirst = props["is-first"] === "true";
    const isLast = props["is-last"] === "true";
    const direction = props.direction || "sent"; // Default to "sent" if direction is not provided
  
    const groupFirstClass = isFirst ? "is-group-first" : "";
    const groupLastClass = isLast ? "is-group-last" : "";
    const bubbleClass = direction === "sent" ? "is-out" : "is-in";
  
    return (
      <>
        <div className="bubbles-group">
          <div
            className={`bubble hide-name can-have-tail ${direction} ${groupFirstClass} ${groupLastClass} ${bubbleClass}`}
            style={{
              // Add any additional styling based on direction if needed
              "--peer-color-rgb": direction === "received" ? "var(--peer-5-color-rgb)" : "",
              "--peer-border-background": direction === "received" ? "var(--peer-5-border-background)" : "",
            }}
          >
            <div className="bubble-content-wrapper">
              <div className="bubble-content">
                <div className="message spoilers-container" dir="auto">
                  {props.msg}
                  <span className="time">
                    <span className="tgico time-sending-status"></span>
                    <span className="i18n" dir="auto">
                      07:48
                    </span>
                    <div
                      className="time-inner"
                      title="12 November 2023, 07:48:55"
                    >
                      <span className="tgico time-sending-status"></span>
                      <span className="i18n" dir="auto">
                        07:48
                      </span>
                    </div>
                  </span>
                </div>
                {isLast && (
                  <svg
                    viewBox="0 0 11 20"
                    width="11"
                    height="20"
                    className="bubble-tail"
                  >
                    <use href="#message-tail-filled"></use>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default ChatBubble;
  
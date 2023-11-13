// RightColumn.js
import React, { useState } from "react";
import ChatInterface from "./ChatInterface";
import ChatInput from "./ChatInput";

const RightColumn = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    // Check if a message with the same content already exists in the state
    const existingMessage = messages.find(
      (msg) => msg.msg === message.msg && msg.direction === message.direction
    );
  
    

    // Add the message only if it doesn't already exist
    if (!existingMessage) {
      setMessages([...messages, message]);
    }
  };

  return (
    <>
      <div className="column" id="column-right">
        <div className="chat-container">
          <div className="chat">
            <ChatInterface messages={messages} addMessage={addMessage} />
            <ChatInput onSend={addMessage} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightColumn;

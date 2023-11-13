// ChatInterface.js
import React, { useEffect } from "react";
import io from "socket.io-client";
import ChatBubble from "./bubble/ChatBubble.js";
import BubbleDate from "./bubble/BubbleDate.js";
import { v4 as uuidv4 } from 'uuid';

const socket = io("http://localhost:5000");

const ChatInterface = ({ messages = [], addMessage }) => {
  // Generate a random user ID for the client
  const userId = uuidv4();

  useEffect(() => {
  socket.on("chat_message", (data) => {
    console.log('Received message:', data.msg);

    // Check if the message is sent by others, not the current user
    if (data.senderId !== userId) {
      addMessage({ msg: data.msg, direction: 'received' });
    }
  });

  return () => {
    socket.off("chat_message");
  };
}, [addMessage, userId]);


  return (
    <>
      <div className="column-header topbar"></div>
      <div className="bubbles">
        <div className="scrollable .scrollable-y">
          <div className="bubbles-inner">
            <section className="bubbles-date-group">
              {messages && messages.length > 0 ? (
                messages.map((message, index) => (
                  <ChatBubble
                    key={index}
                    msg={message.msg}
                    direction={message.direction}
                    is-first="true"
                    is-last="true"
                  />
                ))
              ) : (
                <BubbleDate msg="No messages yet." />
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;

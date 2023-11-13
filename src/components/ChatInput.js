import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your server URL

const ChatInput = ({ onSend }) => {
  const [messageContent, setMessageContent] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  
  const handleInput = () => {
    // Get the div element
    const messageDiv = document.querySelector(".input-message-input");

    // Check if the div has contenteditable attribute
    if (messageDiv && messageDiv.getAttribute("contenteditable") === "true") {
      // Check if the content is empty
      if (messageDiv.textContent.trim() === "") {
        // Add the is-empty class if it's empty
        messageDiv.classList.add("is-empty");
      } else {
        // Remove the is-empty class if it's not empty
        messageDiv.classList.remove("is-empty");
      }
    } else {
      console.log("The div is not contenteditable");
    }
  };

  useEffect(() => {
    // Add event listener for input change
    const inputMessageInput = document.querySelector(".input-message-input");
    if (inputMessageInput) {
      inputMessageInput.addEventListener("input", handleInput);

      return () => {
        inputMessageInput.removeEventListener("input", handleInput);
      };
    } else {
      console.log("Element with class 'input-message-input' not found");
    }
  }, []);

  const handleSendClick = () => {
    // Emit the chat_message event with the message content
    socket.emit("chat_message", { msg: messageContent });
    setSentMessages((prevSentMessages) => [
      ...prevSentMessages,
      { msg: messageContent, direction: "sent" },
    ]);
    // Clear the input after sending the message
    setMessageContent("");
  };

  useEffect(() => {
    var inputMessageInput = document.querySelector(".input-message-input");
    if (inputMessageInput) {
      inputMessageInput.addEventListener("input", handleInput);

      return () => {
        inputMessageInput.removeEventListener("input", handleInput);
      };
    } else {
      console.log("Element with class 'input-message-input' not found");
    }
  }, []);

  useEffect(() => {
    // Generate a random user ID for the client
    const userId = Math.random().toString(36).substring(7);

    // Listen for messages received from the server
    const handleMessageReceived = (data) => {
      // Only call onSend if the message is not sent by the current user
      if (data.senderId !== userId) {
        onSend({ msg: data.msg, direction: "received" });
      }
    };

    socket.on("chat_message", handleMessageReceived);

    return () => {
      socket.off("chat_message", handleMessageReceived);
    };
  }, [onSend]);

  return (
    <div className="chat-input chat-input-main">
      <div className="chat-input-container chat-input-main-container">
        <div className="rows-wrapper-wrapper">
          <div className="rows-wrapper chat-input-wrapper chat-input-main-wrapper chat-rows-wrapper">
            <svg
              viewBox="0 0 11 20"
              width="11"
              height="20"
              className="bubble-tail"
            >
              <use href="#message-tail-filled"></use>
            </svg>
            <div className="new-message-wrapper rows-wrapper-row">
              <button className="btn-icon tgico-smile"></button>
              <div className="input-message-container">
                <div
                  data-placeholder="Message"
                  style={{ transitionDuration: "1000ms", minHeight: "37px" }}
                  contentEditable="true"
                  className="input-message-input i18n scrollable scrollable-y no-scrollbar is-empty"
                ></div>
              </div>
              <div className="btn-icon btn-menu-toggle attach-file">
                <span className="tgico tgico-attach"></span>
              </div>
            </div>
          </div>
          <div className="btn-send-container">
            <button
              className="btn-icon btn-circle btn-send animated-button-icon record"
              onClick={handleSendClick}
            >
              <span className="tgico tgico-send"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;

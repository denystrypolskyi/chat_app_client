import { sendMessage } from "../../actions/messageActions";
import React from "react";

function MessageInput({ messageText, setMessageText, selectedChatId }) {
  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      sendMessage(messageText, selectedChatId, setMessageText);
    }
  };

  return (
    <input
      className="message-input"
      type="text"
      placeholder="Write a message..."
      value={messageText}
      onChange={(e) => {
        setMessageText(e.target.value);
      }}
      onKeyDown={handleKeyDown}
    />
  );
}

export default MessageInput;

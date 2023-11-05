import React from "react";

function MessageInput({ messageText, setMessageText, handleKeyDown }) {
  return (
    <div className="message-input-container">
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
    </div>
  );
}

export default MessageInput;

import React from "react";

function MessageInput({messageText, setMessageText, handleKeyDown}) {
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

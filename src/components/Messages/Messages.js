import React, { useEffect } from "react";
import Message from "../Message/Message";

const Messages = ({ fetchingMessages, messages, messagesEndRef }) => {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages.length]);

  return (
    <div className="messages-container">
      {!fetchingMessages &&
        messages.map((message, index) => {
          return (
            <Message
              key={index}
              value={message[3]}
              avatar={message[2]}
              senderId={message[1]}
            />
          );
        })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;

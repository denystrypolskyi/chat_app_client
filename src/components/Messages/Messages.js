import React, { useEffect } from "react";
import Message from "../Message/Message";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Messages = ({ fetchingMessages, messages, messagesEndRef }) => {
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages.length]);

  return (
    <div className="messages-container">
      {fetchingMessages ? (
        <div className="mini-container">
          <LoadingSpinner />
        </div>
      ) : (
        messages.map((message, index) => {
          return (
            <Message
              key={index}
              value={message[3]}
              avatar={message[2]}
              senderId={message[1]}
              sentAt={message[4]}
            />
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;

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
        <div className="secondary-container">
          <LoadingSpinner />
        </div>
      ) : (
        messages.map((message, index) => {
          return (
            <Message
              key={index}
              value={message.message_text}
              avatar={message.sender_avatar}
              senderId={message.sender_id}
              mSentAt={message.created_at}
            />
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;

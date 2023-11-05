import axios from "axios";
import React, { useEffect, useState } from "react";

const Contact = ({
  avatar,
  name,
  contactId,
  loggedUserId,
  switchChat,
  selectedContactId,
}) => {
  const [image, setImage] = useState(null);
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageSentAt, setLastMessageSentAt] = useState("");

  const handleOnClick = () => {
    switchChat(loggedUserId, contactId);
  };

  useEffect(() => {
    import(`../../assets/img/${avatar}`)
      .then((image) => {
        setImage(image.default);
      })
      .catch((error) => {
        console.error("Image import error", error);
      });

    const fetchLastMessage = () => {
      const URL = "http://localhost/server/getChatLastMessage.php";
      axios
        .get(`${URL}?user1Id=${loggedUserId}&user2Id=${contactId}`)
        .then((response) => {
          if (response.data.status === "success") {
            setLastMessage(response.data.lastMessage);
            setLastMessageSentAt(response.data.lastMessageSentAt);
          } else {
            console.log(response.data);
          }
        });
    };

    fetchLastMessage();

    const intervalId = setInterval(() => {
      fetchLastMessage();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className="contact-container"
      onClick={handleOnClick}
      style={{
        backgroundColor:
          selectedContactId === contactId && "#212b35",
      }}
    >
      <img className="contact-avatar" src={image} alt="avatar" />
      <div className="contact-info">
        <div className="contact-name">{name}</div>
        <p className="last-message">
          {lastMessage ? lastMessage : <i>No messages yet</i>}
        </p>
      </div>
      <div className="message-date">{lastMessageSentAt}</div>
    </div>
  );
};

export default Contact;

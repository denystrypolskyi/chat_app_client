import React, { useEffect, useState } from "react";

const Contact = ({
  avatar,
  name,
  lastMessage,
  messageDate,
  contactId,
  loggedUserId,
  switchChat,
}) => {
  const [image, setImage] = useState(null);

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
  }, []);

  return (
    <div className="contact-container" onClick={handleOnClick}>
      <img className="contact-avatar" src={image} alt="avatar" />
      <div className="contact-info">
        <div className="contact-name">{name}</div>
        <p className="last-message">{lastMessage}</p>
      </div>
      <div className="message-date">{messageDate}</div>
    </div>
  );
};

export default Contact;

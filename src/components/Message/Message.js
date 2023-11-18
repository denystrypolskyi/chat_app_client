import React, { useEffect, useRef, useState } from "react";

const Message = ({ value, avatar, senderId, sentAt }) => {
  const [image, setImage] = useState(null);

  const loggedUserId = localStorage.getItem("loggedUserId");

  const messageSentAt = useRef();

  const formatDate = () => {
    const tmpDate = new Date(sentAt);

    messageSentAt.current = `${tmpDate.getDate()}/${
      tmpDate.getMonth() + 1
    } ${tmpDate.getHours()}:${
      tmpDate.getMinutes() >= 10
        ? tmpDate.getMinutes()
        : "0" + tmpDate.getMinutes()
    }`;
  };

  useEffect(() => {
    import(`../../assets/img/${avatar}`)
      .then((image) => {
        setImage(image.default);
        formatDate();
      })
      .catch((error) => {
        console.error("Image import error", error);
      });
  }, []);

  return (
    <div
      className={
        senderId === loggedUserId
          ? "user-message-container"
          : "sender-message-container"
      }
    >
      <img className="avatar" alt="avatar" src={image} />
      <p className={
        senderId === loggedUserId
          ? "user-message-text"
          : "sender-message-text"
      }>
        {value}
        <p className="message-sent-at">
          {messageSentAt.current}
        </p>
      </p>
    </div>
  );
};

export default Message;

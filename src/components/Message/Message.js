import { useEffect, useRef, useState } from "react";

const formatMessageSentAt = (timestamp) => {
  const tmpDate = new Date(timestamp);
  return `${tmpDate.getDate()}/${
    tmpDate.getMonth() + 1
  } ${tmpDate.getHours()}:${
    tmpDate.getMinutes() >= 10
      ? tmpDate.getMinutes()
      : "0" + tmpDate.getMinutes()
  }`;
};

const Message = ({ value, avatar, senderId, sentAt }) => {
  const [image, setImage] = useState(null);
  const loggedUserId = localStorage.getItem("loggedUserId");
  const messageSentAt = useRef(formatMessageSentAt(sentAt));

  useEffect(() => {
    import(`../../assets/img/${avatar}`)
      .then((image) => {
        setImage(image.default);
      })
      .catch((error) => {
        console.error("Image import error", error);
      });
  }, [avatar, sentAt]);

  return (
    <div
      className={
        senderId === loggedUserId
          ? "user-message-container"
          : "sender-message-container"
      }
    >
      <img className="avatar" alt="avatar" src={image} />
      <div
        className={
          senderId === loggedUserId
            ? "user-message-text"
            : "sender-message-text"
        }
      >
        {value}
        <p className="message-sent-at">{messageSentAt.current}</p>
      </div>
    </div>
  );
};

export default Message;

import React, { useEffect, useState } from "react";

const Message = ({ value, avatar, senderId }) => {
  const [image, setImage] = useState(null);

  const loggedUserId = localStorage.getItem("loggedUserId");

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
    <div
      className={
        loggedUserId === senderId
          ? "my-message-container"
          : "member-message-container"
      }
    >
      <img
        className="avatar"
        alt="avatar"
        src={image}
        // src={`https://misapplied-liver.000webhostapp.com/images/${avatar}`}
      />

      <p
        className={
          loggedUserId === senderId ? "my-message-text" : "member-message-text"
        }
      >
        {value}
      </p>
    </div>
  );
};

export default Message;

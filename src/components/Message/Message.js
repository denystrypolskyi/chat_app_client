import React, { useEffect, useState } from "react";

const Message = ({ value, avatar, senderId }) => {
  const [image, setImage] = useState(null);

  const userId = localStorage.getItem("userId");

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
        userId === senderId
          ? "my-message-container"
          : "member-message-container"
      }
    >
      <img src={image} alt="avatar" className="avatar"></img>
      <p
        className={
          userId === senderId ? "my-message-text" : "member-message-text"
        }
      >
        {value}
      </p>
    </div>
  );
};

export default Message;

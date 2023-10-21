import React, { useEffect, useState } from "react";

const Message = ({ value, avatar, sender_id }) => {
  const [image, setImage] = useState(null);

  const user_id = localStorage.getItem("user_id");

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
        user_id === sender_id
          ? "my-message-container"
          : "member-message-container"
      }
    >
      <img src={image} alt="avatar" className="avatar"></img>
      <p
        className={
          user_id === sender_id ? "my-message-text" : "member-message-text"
        }
      >
        {value}
      </p>
    </div>
  );
};

export default Message;

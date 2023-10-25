import React, { useEffect, useState } from "react";

const Message = ({ value, avatar, senderId }) => {
  // const [image, setImage] = useState(null);

  const userId = localStorage.getItem("userId");

  // useEffect(() => {
  //   const imageURL = import(`../../assets/img/${avatar}`)
  //     .then((image) => {
  //       setImage(image.default);
  //     })
  //     .catch((error) => {
  //       console.error("Image import error", error);
  //     });
  // }, []);

  return (
    <div
      className={
        userId === senderId
          ? "my-message-container"
          : "member-message-container"
      }
    >
      <img
        className="avatar"
        alt="avatar"
        src={`https://misapplied-liver.000webhostapp.com/images/${avatar}`}
      />

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

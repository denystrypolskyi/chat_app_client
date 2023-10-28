import axios from "axios";
import React from "react";

const Contact = ({
  avatar,
  name,
  lastMessage,
  messageDate,
  contactId,
  loggedUserId,
  fetchMessagesForChat
}) => {
  const handleOnClick = () => {
    const URL = "http://localhost/server/createChatRoom.php";
    const formData = new FormData();
    formData.append("user1Id", loggedUserId);
    formData.append("user2Id", contactId);

    axios
      .post(URL, formData)
      .then((response) => {
        if (response.data.status === "success") {
          localStorage.setItem("selectedChatId", response.data.selectedChatId)
          fetchMessagesForChat(localStorage.getItem("selectedChatId"))
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  return (
    <div className="contact-container" onClick={handleOnClick}>
      <img
        style={{
          width: "60px",
          height: "60px",
          padding: "6px",
          borderRadius: "50px",
        }}
        src={avatar}
        alt="avatar"
      />
      <div className="contact-info">
        <div className="contact-name">{name}</div>
        <p className="last-message">{lastMessage}</p>
      </div>
      <div className="message-date">{messageDate}</div>
    </div>
  );
};

export default Contact;

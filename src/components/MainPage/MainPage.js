import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import Message from "../Message/Message";

const MainPage = () => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  const getMessages = () => {
    const URL = "https://misapplied-liver.000webhostapp.com/getMessages.php";
    axios
      .get(URL)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          setMessages(response.data.messages);
          setTimeout(() => {
            getMessages();
          }, 1000);
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    // const URL = "http://localhost/server/sendMessage.php";
    const URL = "https://misapplied-liver.000webhostapp.com/sendMessage.php";
    const userId = localStorage.getItem("userId");
    const senderAvatar = localStorage.getItem("avatar");

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("messageText", messageText);
    formData.append("senderAvatar", senderAvatar);

    axios
      .post(URL, formData)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          setMessageText("");
          getMessages();
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  useEffect(() => {
    if (localStorage.getItem("userId") <= 0) {
      navigate("/login");
    }
    getMessages();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="messages-container">
          {messages.map((message, index) => {
            return (
              <Message
                key={index}
                value={message[3]}
                avatar={message[2]}
                senderId={message[1]}
              />
            );
          })}
        </div>
        <div className="message-input-container">
          <input
            type="text"
            className="message-input"
            style={{ flex: "9" }}
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your message"
          ></input>
          <button
            onClick={handleClick}
            className="send-button"
            style={{ flex: "1" }}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

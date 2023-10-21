import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import Message from "../Message/Message";

const MainPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  const handleClick = () => {
    const URL = "http://localhost/server/sendMessage.php";
    const user_id = localStorage.getItem("user_id");
    const sender_avatar = localStorage.getItem("avatar");

    const data = {
      user_id: user_id,
      content: message,
      sender_avatar: sender_avatar,
    };

    axios
      .post(URL, data)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          setMessage("");
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  useEffect(() => {
    if (localStorage.getItem("user_id") <= 0) {
      navigate("/login");
    }

    const URL = "http://localhost/server/getMessages.php";

    axios
      .get(URL)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          setMessages(response.data.messages);
        }
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  return (
    <div className="container">
      {/* <Navbar /> */}
      <div className="messages-container">
        {messages.map((message, index) => {
          return (
            <Message
              key={index}
              value={message[3]}
              avatar={message[2]}
              sender_id={message[1]}
            />
          );
        })}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          className="my-input"
          style={{ flex: "9" }}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Type your message"
        ></input>
        <button
          onClick={() => handleClick()}
          className="my-button"
          style={{ flex: "1" }}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default MainPage;

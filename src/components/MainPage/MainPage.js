import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Message from "../Message/Message";
import Tate from "../../assets/img/f302415385cda5526b4fcb348adc381a.jpg";
import Contact from "../Contact/Contact";

const MainPage = () => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const fetchMessagesForChat = (id) => {
    setSelectedChatId(id);
    console.log(id);
  };

  const getMessages = () => {
    // const URL = "https://misapplied-liver.000webhostapp.com/getMessages.php";
    const URL = "https://localhost/server/getMessages.php";

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

  const handleClick = () => {
    // const URL = "https://misapplied-liver.000webhostapp.com/sendMessage.php";
    const URL = "http://localhost/server/sendMessage.php";
    const loggedUserId = localStorage.getItem("loggedUserId");
    const senderAvatar = localStorage.getItem("avatar");
    const formData = new FormData();
    formData.append("loggedUserId", loggedUserId);
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

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      handleClick();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("loggedUserId") === 0) {
      navigate("/login");
    }
    getMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages.length]);

  return (
    <div className="my-container">
      <div className="contacts">
        <Contact
          avatar={Tate}
          name="Tate"
          lastMessage="Where is Lydia?"
          messageDate="7:59 PM"
          contactId="13"
          loggedUserId={localStorage.getItem("loggedUserId")}
          fetchMessagesForChat={fetchMessagesForChat}
        />
      </div>
      <div className="conversation-container">
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
          <div ref={messagesEndRef} />
        </div>
        {selectedChatId && (
          <div className="message-input-container">
            <input
              className="message-input"
              type="text"
              placeholder="Enter your message"
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}
        {(messages.length === 0 && !selectedChatId) && (
          <div className="hint">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default MainPage;

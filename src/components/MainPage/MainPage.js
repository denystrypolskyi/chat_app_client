import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Импортируем useParams из React Router
import Message from "../Message/Message";
import Contact from "../Contact/Contact";

const MainPage = () => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [chatSelected, setChatSelected] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [fetching, setFetching] = useState(true);

  const messagesEndRef = useRef(null);

  const navigate = useNavigate();

  const fetchContacts = () => {
    const URL = "http://localhost/server/getContacts.php";
    axios
      .get(`${URL}?loggedUserId=${localStorage.getItem("loggedUserId")}`)
      .then((response) => {
        if (response.data.status === "success") {
          setContacts(response.data.contacts);
          setFetching(false);
        } else {
          console.log(response.data);
        }
      });
  };

  const fetchMessagesForChat = (chatId) => {
    const URL = "http://localhost/server/getChatMessages.php";
    axios.get(`${URL}?selectedChatId=${chatId}`).then((response) => {
      if (response.data.status === "success") {
        setMessages(response.data.messages);
      } else {
        console.log(response.data);
      }
    });
  };

  const switchChat = (loggedUserId, contactId) => {
    setChatSelected(true);
    const URL = "http://localhost/server/switchChat.php";
    axios
      .get(`${URL}?user1Id=${loggedUserId}&user2Id=${contactId}`)
      .then((response) => {
        if (response.data.status === "success") {
          const newChatId = response.data.selectedChatId;
          navigate(`/main?chatId=${newChatId}`);
          setChatId(newChatId);
        } else {
          console.log(response.data);
        }
      });
  };

  const sendMessage = () => {
    // const URL = "https://misapplied-liver.000webhostapp.com/sendMessage.php";
    const URL = "http://localhost/server/sendMessage.php";
    const loggedUserId = localStorage.getItem("loggedUserId");
    const senderAvatar = localStorage.getItem("avatar");
    const formData = new FormData();
    formData.append("loggedUserId", loggedUserId);
    formData.append("messageText", messageText);
    formData.append("senderAvatar", senderAvatar);
    formData.append("chatRoomId", chatId);
    axios
      .post(URL, formData)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          setMessageText("");
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatId) {
      setChatId(chatId);
      fetchMessagesForChat(chatId);
      setChatSelected(true);

      const intervalId = setInterval(() => {
        fetchMessagesForChat(chatId);
      }, 500);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [chatId]);

  useEffect(() => {
    const loggedUserId = localStorage.getItem("loggedUserId");
    if (loggedUserId <= 0) {
      navigate("/login");
    } else {
      fetchContacts();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages.length]);

  return (
    <div className="my-container">
      <div className="contacts">
        {fetching
          ? "loading..."
          : contacts.map((contact, index) => {
              return (
                <Contact
                  key={index}
                  avatar={contact[2]}
                  name={contact[1]}
                  contactId={contact[0]}
                  loggedUserId={localStorage.getItem("loggedUserId")}
                  switchChat={switchChat}
                />
              );
            })}
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
        {chatSelected && (
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
        {!chatSelected && (
          <div className="hint">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default MainPage;

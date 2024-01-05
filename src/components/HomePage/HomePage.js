import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Contacts from "../Contacts/Contacts";
import Messages from "../Messages/Messages";
import MessageInput from "../MessageInput/MessageInput";
import { fetchContacts } from "../../actions/contactActions";
import { fetchMessagesForChat } from "../../actions/messageActions";
import { API_URLS } from "../../apiConfig";

const HomePage = () => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(0);
  const [fetchingContacts, setFetchingContacts] = useState(true);
  const [fetchingMessages, setFetchingMessages] = useState(true);

  const loggedUserId = parseInt(localStorage.getItem("loggedUserId")) || 0;

  const messagesEndRef = useRef(null);

  const navigate = useNavigate();

  const MESSAGE_FETCH_INTERVAL = 500;

  const logout = () => {
    localStorage.setItem("loggedUserId", 0);
    navigate("/login");
  };

  const switchChat = (loggedUserId, contactId) => {
    axios
      .get(
        `${API_URLS.switchChat}?user1Id=${loggedUserId}&user2Id=${contactId}`
      )
      .then((response) => {
        if (response.data.status === "success") {
          setSelectedContactId(contactId);
          const newChatId = response.data.selectedChatId;
          navigate(`/home?chatId=${newChatId}`);
          setSelectedChatId(newChatId);
        } else {
          console.log("Error: ", response.data);
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  useEffect(() => {
    if (selectedChatId) {
      setSelectedChatId(selectedChatId);
      setFetchingMessages(true);
      fetchMessagesForChat(selectedChatId, setMessages, setFetchingMessages);

      const intervalId = setInterval(() => {
        fetchMessagesForChat(selectedChatId, setMessages, setFetchingMessages);
      }, MESSAGE_FETCH_INTERVAL);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [selectedChatId]);

  useEffect(() => {
    if (loggedUserId === 0) {
      navigate("/login");
    } else {
      fetchContacts(setContacts, setFetchingContacts, loggedUserId);
    }
  }, [loggedUserId]);

  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "column", width: "20vw" }}>
        <Contacts
          fetchingContacts={fetchingContacts}
          contacts={contacts}
          switchChat={switchChat}
          selectedContactId={selectedContactId}
        />
        <div className="panel-container">
          <div
            className="settings-btn"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <i className="fa-solid fa-gear" />
          </div>
          <div className="switch-account-btn" onClick={logout}>
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </div>
        </div>
      </div>
      {selectedChatId && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Messages
            fetchingMessages={fetchingMessages}
            messages={messages}
            messagesEndRef={messagesEndRef}
          />
          <MessageInput
            messageText={messageText}
            setMessageText={setMessageText}
            selectedChatId={selectedChatId}
          />
        </div>
      )}
      {!selectedChatId && (
        <div className="secondary-container">
          <p className="hint">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;

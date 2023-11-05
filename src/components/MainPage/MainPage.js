import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contacts from "../Contacts/Contacts";
import Messages from "../Messages/Messages";
import MessageInput from "../MessageInput/MessageInput";

const MainPage = () => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedContactId, setSelectedContactId] = useState(0);
  const [fetchingContacts, setFetchingContacts] = useState(true);
  const [fetchingMessages, setFetchingMessages] = useState(true);

  const messagesEndRef = useRef(null);

  const navigate = useNavigate();

  const fetchContacts = () => {
    const URL = "http://localhost/server/getContacts.php";
    axios
      .get(`${URL}?loggedUserId=${localStorage.getItem("loggedUserId")}`)
      .then((response) => {
        if (response.data.status === "success") {
          setContacts(response.data.contacts);
          setFetchingContacts(false);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  const fetchMessagesForChat = (selectedChatId) => {
    const URL = "http://localhost/server/getChatMessages.php";
    axios
      .get(`${URL}?selectedChatId=${selectedChatId}`)
      .then((response) => {
        if (response.data.status === "success") {
          setMessages(response.data.messages);
          setFetchingMessages(false);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  const switchChat = (loggedUserId, contactId) => {
    const URL = "http://localhost/server/switchChat.php";
    axios
      .get(`${URL}?user1Id=${loggedUserId}&user2Id=${contactId}`)
      .then((response) => {
        if (response.data.status === "success") {
          setSelectedContactId(contactId);
          const newChatId = response.data.selectedChatId;
          navigate(`/main?chatId=${newChatId}`);
          setSelectedChatId(newChatId);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => console.error("Error: ", error));
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
    formData.append("chatRoomId", selectedChatId);
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
    if (selectedChatId) {
      setSelectedChatId(selectedChatId);
      fetchMessagesForChat(selectedChatId);

      const intervalId = setInterval(() => {
        fetchMessagesForChat(selectedChatId);
      }, 500);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [selectedChatId]);

  useEffect(() => {
    const loggedUserId = localStorage.getItem("loggedUserId");
    if (loggedUserId <= 0) {
      navigate("/login");
    } else {
      fetchContacts();
    }
  }, []);

  return (
    <div className="my-container">
      <Contacts
        fetchingContacts={fetchingContacts}
        contacts={contacts}
        switchChat={switchChat}
        selectedContactId={selectedContactId}
      />
      <div className="conversation-container">
        <Messages
          fetchingMessages={fetchingMessages}
          messages={messages}
          messagesEndRef={messagesEndRef}
        />
        {selectedChatId && (
          <MessageInput
            messageText={messageText}
            setMessageText={setMessageText}
            handleKeyDown={handleKeyDown}
          />
        )}
        {!selectedChatId && (
          <div className="hint">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default MainPage;

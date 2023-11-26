import axios from "axios";
import { API_URLS } from "../apiConfig";

export const fetchMessagesForChat = (
  selectedChatId,
  setMessages,
  setFetchingMessages
) => {
  axios
    .get(`${API_URLS.getChatMessages}?selectedChatId=${selectedChatId}`)
    .then((response) => {
      if (response.data.status === "success") {
        setMessages(response.data.messages);
        setFetchingMessages(false);
      } else {
        setFetchingMessages(false);
        console.log("Error: ", response.data);
      }
    })
    .catch((error) => console.error("Error: ", error));
};

export const sendMessage = (messageText, selectedChatId, setMessageText) => {
  const formData = new FormData();
  formData.append("loggedUserId", localStorage.getItem("loggedUserId"));
  formData.append("senderAvatar", localStorage.getItem("avatar"));
  formData.append("messageText", messageText);
  formData.append("chatRoomId", selectedChatId);
  axios
    .post(API_URLS.sendMessage, formData)
    .then((response) => {
      setMessageText("");
      if (response.data.status === "error") {
        console.log("Error: ", response.data);
      }
    })
    .catch((error) => console.error("Error: ", error));
};

import axios from "axios";
import { API_URLS } from "../apiConfig";

export const fetchContacts = (
  setContacts,
  setFetchingContacts,
  loggedUserId
) => {
  axios
    .get(`${API_URLS.getContacts}?loggedUserId=${loggedUserId}`)
    .then((response) => {
      if (response.data.status === "success") {
        setContacts(response.data.contacts);
        setFetchingContacts(false);
      } else {
        setFetchingContacts(false);
        console.log("Error: ", response.data);
      }
    })
    .catch((error) => console.error("Error: ", error));
};

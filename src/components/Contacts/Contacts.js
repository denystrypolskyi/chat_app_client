import React from "react";
import Contact from "../Contact/Contact";

const Contacts = ({
  fetchingContacts,
  contacts,
  switchChat,
  selectedContactId,
}) => {
  return (
    <div
      style={{ width: "20vw", backgroundColor: "#17212b", overflowY: "auto" }}
    >
      {fetchingContacts
        ? "Loading..."
        : contacts.map((contact, index) => {
            return (
              <Contact
                key={index}
                avatar={contact[3]}
                name={contact[1]}
                contactId={contact[0]}
                loggedUserId={localStorage.getItem("loggedUserId")}
                switchChat={switchChat}
                selectedContactId={selectedContactId}
              />
            );
          })}
    </div>
  );
};

export default Contacts;
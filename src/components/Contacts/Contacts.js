import React from "react";
import Contact from "../Contact/Contact";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const Contacts = ({
  fetchingContacts,
  contacts,
  switchChat,
  selectedContactId,
}) => {
  const loggedUserId = parseInt(localStorage.getItem("loggedUserId"));

  return (
    <div className="contacts-container">
      {fetchingContacts ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LoadingSpinner />
        </div>
      ) : (
        contacts.map((contact, index) => {
          return (
            <Contact
              key={index}
              avatar={contact[3]}
              name={contact[1]}
              contactId={contact[0]}
              loggedUserId={loggedUserId}
              switchChat={switchChat}
              selectedContactId={selectedContactId}
            />
          );
        })
      )}
    </div>
  );
};

export default Contacts;

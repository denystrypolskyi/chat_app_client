import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ChangeAvatar from "../ChangeAvatar/ChangeAvatar";
import ChangePassword from "../ChangePassword/ChangePassword";

const SettingsPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loggedUserId = parseInt(localStorage.getItem("loggedUserId")) || 0;

  return (
    <div className="settings-container">
      {isLoading && <LoadingSpinner />}
      {infoMessage && (
        <div className="info-message" style={{ marginBottom: "35px" }}>
          {infoMessage}
        </div>
      )}
      {errorMessage && (
        <div className="error-message" style={{ marginBottom: "35px" }}>
          {errorMessage}
        </div>
      )}
      <ChangeAvatar
        setErrorMessage={setErrorMessage}
        setInfoMessage={setInfoMessage}
        loggedUserId={loggedUserId}
        setIsLoading={setIsLoading}
      />
      <ChangePassword
        setIsLoading={setIsLoading}
        setInfoMessage={setInfoMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default SettingsPage;

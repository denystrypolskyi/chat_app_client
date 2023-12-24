import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_URLS } from "../../apiConfig";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const SettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const changePassword = () => {
    setIsLoading(true);
    setInfoMessage("");
    setErrorMessage("");

    setTimeout(() => {
      if (!currentPassword || !newPassword || !repeatNewPassword) {
        setErrorMessage("Ensure all required fields are filled out.");
        setIsLoading(false);
        return;
      }

      if (newPassword !== repeatNewPassword) {
        setErrorMessage("Passwords do not match.");
        setIsLoading(false);
        return;
      }

      const formData = new FormData();

      formData.append("userId", localStorage.getItem("loggedUserId"));
      formData.append("currentPassword", currentPassword);
      formData.append("newPassword", newPassword);
      formData.append("repeatNewPassword", repeatNewPassword);

      axios
        .post(API_URLS.changePassword, formData)
        .then((response) => {
          if (response.data.status === "success") {
            setInfoMessage(response.data.message);
          } else {
            setErrorMessage(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
          setErrorMessage("An error occurred. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 500);
  };
  return (
    <div className="settings-container">
      {isLoading && <LoadingSpinner />}
      {infoMessage && (
        <div className="success-message" style={{ marginBottom: "15px" }}>
          {infoMessage}
        </div>
      )}
      {errorMessage && (
        <div className="error-message" style={{ marginBottom: "15px" }}>
          {errorMessage}
        </div>
      )}
      <div className="wrapper">
        <div className="input-data">
          <input
            value={currentPassword}
            type="password"
            required
            autoComplete="off"
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
          />
          <div className="underline"></div>
          <label form="currentPassword">Enter current password</label>
        </div>

        <div className="input-data">
          <input
            value={newPassword}
            type="password"
            required
            autoComplete="off"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <div className="underline"></div>
          <label form="newPassword">Enter new password</label>
        </div>

        <div className="input-data">
          <input
            value={repeatNewPassword}
            type="password"
            required
            autoComplete="off"
            onChange={(e) => {
              setRepeatNewPassword(e.target.value);
            }}
          />
          <div className="underline"></div>
          <label form="repeatNewPassword">Re-enter new password</label>
        </div>

        <div className="button-group">
          <button
            className="custom-btn cancel"
            onClick={() => {
              navigate("/home");
            }}
          >
            Cancel
          </button>
          <button className="custom-btn" onClick={changePassword}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

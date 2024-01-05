import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { API_URLS } from "../../apiConfig";

const ChangePassword = ({ setIsLoading, setInfoMessage, setErrorMessage }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const navigate = useNavigate();

  const changePassword = () => {
    setIsLoading(true);
    setInfoMessage("");
    setErrorMessage("");

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
  };

  return (
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
        <div className="underline" />
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
  );
};

export default ChangePassword;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    const URL = "http://localhost/server/register.php";
    // const URL = "https://misapplied-liver.000webhostapp.com/register.php";
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("uploadedFile", file);

    axios
      .post(URL, formData)
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          setInfoMessage("Account created.");
          setEmail("");
          setPassword("");
          setFile("");
          setError("");
        } else {
          setInfoMessage("");
          setError(response.data.message);
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  useEffect(() => {
    if (localStorage.getItem("loggedUserId") === 0) {
      navigate("/main");
    }
  }, []);

  return (
    <div className="center-container">
      {infoMessage && (
        <p className="info-message" style={{ marginBottom: "15px" }}>
          {infoMessage}
        </p>
      )}
      {error && (
        <p className="error" style={{ marginBottom: "15px" }}>
          {error}
        </p>
      )}
      <h1 className="dark-blue">Getting started is easy!</h1>
      <p className="light-grey" style={{ marginTop: "15px" }}>
        Create a new account if you don't have one to access Whisper features.
      </p>
      <input
        type="email"
        placeholder="E-Mail Address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="custom-input"
        style={{ marginTop: "15px" }}
      />
      <br />
      <input
        type="password"
        placeholder="**********"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="custom-input"
      />
      <div className="fileinput-container" style={{ marginTop: "15px" }}>
        <p className="light-grey" style={{ marginRight: "12px" }}>
          Please select your profile picture:
        </p>
        <div className="file-input-container">
          <label
            htmlFor="fileInput"
            style={{
              cursor: "pointer",
              color: "#2086ea",
            }}
          >
            Select File
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>
      </div>
      <button
        className="custom-button"
        onClick={handleClick}
        style={{ marginTop: "15px" }}
      >
        Sign Up
      </button>
      <div style={{ width: "450px", marginTop: "15px" }}>
        <p className="dark-blue">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#4B9EEE" }}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FileInput from "../FileInput/FileInput";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    const URL = "http://localhost/server/register.php";
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);
    formData.append("uploadedFile", file);

    axios
      .post(URL, formData)
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error: ", error));
  };

  useEffect(() => {
    if (localStorage.getItem("user_id") > 0) {
      navigate("/main");
    }
  }, []);

  return (
    <div className="center-container">
      <h1>Getting started is easy!</h1>
      <p className="invisible">
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
      <br />
      {/* <FileInput
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <br /> */}
      <button className="custom-button" onClick={() => handleClick()}>
        SIGN UP
      </button>
      <div style={{ width: "450px" }}>
        <p style={{ fontWeight: 500 }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#4B9EEE" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    // const URL = "http://localhost/server/login.php";
    const URL = "https://misapplied-liver.000webhostapp.com/login.php";
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    axios
      .post(URL, formData)
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("avatar", response.data.avatar);
          navigate("/main");
        } else {
          setError(response.data.message);
          console.log(response.data);
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  useEffect(() => {
    if (localStorage.getItem("userId") > 0) {
      navigate("/main");
    }
  }, []);

  return (
    <div className="center-container">
      {error && <p className="error">{error}</p>}
      <h1 className="">Welcome Back!</h1>
      <p className="invisible">
        Enter your credentials to access your Whisper account.
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
      <button className="custom-button" onClick={handleClick}>
        Sign In
      </button>
      <div style={{ width: "450px" }}>
        <p style={{ fontWeight: 500 }}>
          Not a member yet?{" "}
          <Link
            style={{ textDecoration: "none", color: "#4B9EEE" }}
            to="/register"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

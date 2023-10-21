import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    const URL = "http://localhost/server/login.php";
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    axios
      .post(URL, formData)
      .then((response) => {
        if (response.data.status === "success") {
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("avatar", response.data.avatar);
          navigate("/main");
        }
      })
      .catch((error) => console.error("Error: ", error));
  };

  useEffect(() => {
    if (localStorage.getItem("user_id") > 0) {
      navigate("/main");
    }
  }, []);

  return (
    <div className="center-container">
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
      <button className="custom-button" onClick={() => handleClick()}>
        SIGN IN
      </button>
      <div style={{ width: "450px" }}>
        <p style={{ fontWeight: 500 }}>
          Not a member yet?{" "}
          <Link
            style={{ textDecoration: "none", color: "#4B9EEE" }}
            to="/register"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

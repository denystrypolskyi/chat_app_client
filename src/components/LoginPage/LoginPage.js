import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {API_URLS} from "../../apiConfig";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const loggedUserId = parseInt(localStorage.getItem("loggedUserId")) || 0;

    const navigate = useNavigate();

    const handleClick = () => {
        setErrorMessage("");
        setIsLoading(true);
        const formData = new FormData();

        formData.append("email", email);
        formData.append("password", password);

        axios
            .post(API_URLS.login, formData)
            .then((response) => {
                if (response.data.status === "success") {
                    setIsLoading(false);
                    localStorage.setItem("loggedUserId", response.data.loggedUserId);
                    localStorage.setItem("avatar", response.data.avatar);
                    navigate("/home");
                } else {
                    setIsLoading(false);
                    setErrorMessage(response.data.message);
                }
            })
            .catch((error) => console.error("Error: ", error));
    };

    useEffect(() => {
        if (loggedUserId !== 0) {
            navigate("/home");
        }
    }, []);

    return (
        <div className="center-container">
            {isLoading && <LoadingSpinner/>}
            {errorMessage && (
                <p className="error-message" style={{marginBottom: "15px"}}>
                    {errorMessage}
                </p>
            )}
            <h1 className="dark-blue">Welcome Back!</h1>
            <p className="light-grey" style={{marginTop: "15px"}}>
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
                style={{marginTop: "15px"}}
            />
            <input
                type="password"
                placeholder="**********"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                className="custom-input"
                style={{marginTop: "15px"}}
            />
            <button
                className="custom-btn2"
                onClick={handleClick}
                style={{marginTop: "15px"}}
            >
                Sign In
            </button>
            <div style={{width: "450px", marginTop: "15px"}}>
                <p className="dark-blue">
                    Not a member yet?{" "}
                    <Link
                        style={{textDecoration: "none", color: "#4B9EEE"}}
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

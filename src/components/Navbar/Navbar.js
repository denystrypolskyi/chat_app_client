import React from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        marginBottom: "10px",
      }}
    >
      {/* <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          color: "#1F6CB7",
          fontWeight: 600,
        }}
        onClick={() => {
          console.log("Back");
        }}
      >
        Back
      </button> */}
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          color: "red",
          fontWeight: 600,
        }}
        onClick={() => {
          localStorage.setItem("loggedUserId", 0);
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

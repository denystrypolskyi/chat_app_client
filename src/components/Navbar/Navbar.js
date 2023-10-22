import React from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "absolute", right: 0 }}>
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
          color: "white",
          fontWeight: 500,
        }}
        onClick={() => {
          localStorage.setItem("userId", 0);
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("logged")) {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ position: "absolute", right: 0 }}>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          color: "red",
          fontWeight: 500,
        }}
        onClick={() => {
          localStorage.setItem("user_id", 0);
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

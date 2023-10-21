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
    <div>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <li>
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              cursor: "pointer",
              color: "red",
            }}
            onClick={() => {
              localStorage.setItem("user_id", 0);
              navigate("/login");
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("loggedUserId", 0);
    navigate("/login");
  };

  return (
    <span className="switch-account" onClick={handleClick}>
      Log out
    </span>
  );
};

export default Logout;
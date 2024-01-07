import React, { useEffect, useRef, useState } from "react";
import { API_URLS } from "../../apiConfig";
import axios from "axios";

const ChangeAvatar = ({
  setErrorMessage,
  setInfoMessage,
  loggedUserId,
  setIsLoading,
}) => {
  const [currentAvatar, setCurrentAvatar] = useState("");

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    const formData = new FormData();

    formData.append("uploadedFile", selectedFile);
    formData.append("userId", loggedUserId);

    axios
      .post(API_URLS.changeAvatar, formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          import(`../../assets/img/${selectedFile.name}`)
            .then((image) => {
              setCurrentAvatar(image.default);
              localStorage.setItem("avatar", selectedFile.name)
            })
            .catch((error) => {
              console.error("Image import error", error);
            });
          setErrorMessage("");
          setInfoMessage(response.data.message);
        } else {
          setInfoMessage("");
          setErrorMessage(response.data.message);
        }
      })
      .catch((error) => console.error("Error: ", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const fetchUserAvatar = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${API_URLS.getUserAvatar}?userId=${loggedUserId}`
        );
        import(`../../assets/img/${response.data.avatar}`)
          .then((image) => {
            setCurrentAvatar(image.default);
          })
          .catch((error) => {
            console.error("Image import error", error);
          });
      } catch (error) {
        console.error("Error fetching user avatar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAvatar();
  }, []);

  return (
    <div className="change-avatar-section">
      <img
        style={{ borderRadius: "50%", cursor: "pointer", height: "100%", maxWidth: "300px"}}
        src={currentAvatar}
        alt="Current Avatar"
        onMouseEnter={(e) => {
          e.target.style.opacity = 0.5;
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = 1;
        }}
        onClick={handleImageClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ChangeAvatar;

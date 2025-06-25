import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../Context/UserContext";

const UserLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser({
            fullname: {
              firstname: "",
              lastname: "",
            },
            email: "",
            token: "",
          });
          navigate("/login");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    logout();
  }, []);
  return <div>UserLogout</div>;
};

export default UserLogout;

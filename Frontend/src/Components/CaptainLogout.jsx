import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/CaptainContext";
import { useEffect, useState } from "react";
import axios from "axios";

const CaptainLogout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const token = localStorage.getItem("captainToken");
  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captain/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          localStorage.removeItem("captain");
          localStorage.removeItem("captainToken");
          setCaptain({
            fullname: {
              firstname: "",
              lastname: "",
            },
            email: "",
            vehicle: {
              color: "",
              plateNumber: "",
              capacity: "",
              type: "",
            },
            token: "",
          });
          navigate("/captain-login");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        setIsLoading(false);
      }
    };
    logout();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>CaptainLogout</div>;
};

export default CaptainLogout;

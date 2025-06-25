import axios from "axios";
import React from "react";
import { useEffect, useContext, useState } from "react";
import { CaptainDataContext } from "../Context/CaptainContext";
import { useNavigate } from "react-router-dom";
const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("captainToken");
  const [isLoading, setIsLoading] = useState(true);
  const { setCaptain } = useContext(CaptainDataContext);
  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      localStorage.removeItem("captain");
      localStorage.removeItem("captainToken");
      navigate("/captain-login");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsLoading(false);
          if (response.status !== 200) {
            localStorage.removeItem("captain");
            localStorage.removeItem("captainToken");
            navigate("/captain-login");
          } else {
            setCaptain(response.data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          localStorage.removeItem("captain");
          localStorage.removeItem("captainToken");
          navigate("/captain-login");
        });
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default CaptainProtectWrapper;

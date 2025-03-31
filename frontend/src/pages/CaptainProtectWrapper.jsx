import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext.jsx";

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/captain/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain && setCaptain(response.data);
        }
      })
      .catch((err) => {
        console.error(
          "Error fetching captain data:",
          err.response?.data || err.message
        );
        localStorage.removeItem("token");
        navigate("/captain/login");
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-t-4 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogout = () => {
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutCaptain = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/captain/login");
          return;
        }

        await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Clear Captain data
        setCaptain(null);
        localStorage.removeItem("token");
        navigate("/captain/login");
      } catch (error) {
        console.error("Logout failed:", error);
        // Optionally handle errors, e.g., show a message to the Captain
      }
    };

    logoutCaptain();
  }, [navigate, setCaptain]);

  return <div>Logging out...</div>;
};

export default CaptainLogout;

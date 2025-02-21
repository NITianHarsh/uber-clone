import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const UserLogout = () => {
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/user/login");
          return;
        }

        await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Clear user data
        setUser(null);
        localStorage.removeItem("token");
        navigate("/user/login");
      } catch (error) {
        console.error("Logout failed:", error);
        // Optionally handle errors, e.g., show a message to the user
      }
    };

    logoutUser();
  }, [navigate, setUser]);

  return <div>Logging out...</div>;
};

export default UserLogout;

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) {
      navigate("/user/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/user/login");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;

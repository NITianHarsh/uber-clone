import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserProtectWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/user/login");
    }
  }, [token]);

  return <> {children}</>;
}

export default UserProtectWrapper;

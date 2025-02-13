import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CaptainProtectedWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/captain/login");
    }
  }, [token]);

  return <> {children}</>;
}

export default CaptainProtectedWrapper;

import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import userProtectedWrapper from "./pages/userProtectedWrapper";
import UserLogout from "./pages/UserLogout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/home"
          element={
            <userProtectedWrapper>
              <Home />
            </userProtectedWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <userProtectedWrapper>
              <UserLogout />
            </userProtectedWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

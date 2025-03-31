import React from "react";
import Start from "./pages/Start";
import Riding from "./pages/Riding";
import "remixicon/fonts/remixicon.css";
import UserHome from "./pages/UserHome";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import UserSignup from "./pages/UserSignup";
import CaptainHome from "./pages/CaptainHome";
import Captainlogin from "./pages/CaptainLogin";
import { Route, Routes } from "react-router-dom";
import CaptainRiding from "./pages/CaptainRiding";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainSignup from "./pages/CaptainSignup";
import SocketProvider from "./context/SocketContext";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
// testing the app
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/riding" element={<Riding />} />
        <Route path="/captain/riding" element={<CaptainRiding />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/captain/login" element={<Captainlogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route
          path="/user/home"
          element={
            <SocketProvider>
              <UserProtectWrapper>
                <UserHome />
              </UserProtectWrapper>
            </SocketProvider>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain/home"
          element={
            <SocketProvider>
              <CaptainProtectWrapper>
                <CaptainHome />
              </CaptainProtectWrapper>
            </SocketProvider>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

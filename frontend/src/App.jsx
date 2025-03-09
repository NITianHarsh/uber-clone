import React ,{useContext} from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Captainlogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserHome from "./pages/UserHome";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import "remixicon/fonts/remixicon.css";
 import SocketProvider, { SocketContext } from "./context/SocketContext";

const App = () => {
  return (
    <div>
    
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/riding" element={<Riding />} />
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

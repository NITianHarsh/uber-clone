import React from "react";
import { Route, Routes } from "react-router-dom";

import Start from "./pages/Start";

import UserHome from "./pages/user/UserHome";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";
import UserLogout from "./pages/user/UserLogout";
import UserProtectedWrapper from "./pages/user/UserProtectedWrapper";

import CaptainHome from "./pages/captain/CaptainHome";
import CaptainLogin from "./pages/captain/CaptainLogin";
import CaptainSignup from "./pages/captain/CaptainSignup";
import CaptainLogout from "./pages/captain/CaptainLogout";
import CaptainProtectedWrapper from "./pages/captain/CaptainProtectedWrapper";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route
          path="/userhome"
          element={
            <UserProtectedWrapper>
              {" "}
              <UserHome />{" "}
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/captainhome"
          element={
            <CaptainProtectedWrapper>
              <CaptainHome />
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        />
      </Routes>
    </>
  );
};

export default App;

import Home from "./pages/Home";
import Start from "./pages/Start";
import Riding from "./pages/Riding";
import "remixicon/fonts/remixicon.css";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogin from "./pages/CaptainLogin";
import { Route, Routes } from "react-router-dom";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainRiding from "./pages/CaptainRiding";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />

        {/* User Routes */}
        <Route path="/user/riding" element={<Riding />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/home"  element={<UserProtectWrapper> <Home /> </UserProtectWrapper>} />

        {/* Captain Routes */}
        <Route path="/captain/riding" element={<CaptainRiding />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route path="/captain/home"  element={<CaptainProtectWrapper> <CaptainHome /> </CaptainProtectWrapper>} />

      </Routes>
    </ >
  );
};

export default App;

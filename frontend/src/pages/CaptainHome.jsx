import gsap from "gsap";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import RidePopUp from "../components/RidePopUp";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import { SocketContext } from "../context/SocketContext";
import CaptainDetails from "../components/CaptainDetails";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useRef, useState, useEffect, useContext } from "react";
import { CaptainDataContext } from "../context/CapatainContext";

const CaptainHome = () => {
  const [ride, setRide] = useState(null);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, []);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopupPanel(true);
  });

  const handleLogout = (e) => {
    localStorage.removeItem("captain-token");
    navigate("/captain/login");
  };

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Ride confirmed by captain :", response.data);
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  // GSAP animations
  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      y: ridePopupPanel ? 0 : "100%",
      duration: 0.3,
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      y: confirmRidePopupPanel ? 0 : "100%",
      duration: 0.3,
    });
  }, [confirmRidePopupPanel]);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col font-sans">
      {/* Logo and Hamburger */}
      <div className="h-10 p-6 px-3 flex items-center bg-green-400 justify-between gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-3xl"
        >
          <i className="ri-menu-line"></i>
        </button>
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <button
          onClick={handleLogout}
          className="h-10 w-10 hover:bg-gray-300 transition rounded-full flex items-center justify-center"
        >
          <i className="text-xl ri-logout-box-r-line text-gray-700"></i>
        </button>
      </div>

      {/* Map */}
      <div className="flex-1 overflow-auto p-1">
        <LiveTracking />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[90%] sm:w-[400px] bg-white shadow-xl z-40 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 overflow-y-auto h-full">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-2xl mb-4"
          >
            <i className="ri-close-line"></i>
          </button>
          <CaptainDetails />
        </div>
      </div>

      {/* Ride Request Pop-Up */}
      <div
        ref={ridePopupPanelRef}
        className="fixed bottom-0 left-0 w-full translate-y-full bg-white px-4 py-10 pt-14 rounded-t-3xl shadow-2xl z-30"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Pop-Up */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed bottom-0 left-0 w-full h-screen translate-y-full bg-white px-4 py-10 pt-14 z-30 shadow-2xl"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;

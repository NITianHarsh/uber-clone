import gsap from "gsap";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import RidePopUp from "../components/RidePopUp";
import { SocketContext } from "../context/SocketContext";
import CaptainDetails from "../components/CaptainDetails";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { useRef, useState, useEffect, useContext } from "react";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  //  useEffect(() => {
  //   socket.emit("join", {userId: captain._id, userType: "captain", })
  // }, [captain]);
  //   const updateLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition((position) => {
  //         socket.emit("update-location-captain", {
  //           userId: captain._id,
  //           location: {
  //             ltd: position.coords.latitude,
  //             lng: position.coords.longitude,
  //           },
  //         });
  //       });
  //     }
  //   };

  //   const locationInterval = setInterval(updateLocation, 10000);
  //   updateLocation();

  //   // return () => clearInterval(locationInterval)
  // }, []);

  // socket.on("new-ride", (data) => {
  //   setRide(data);
  //   setRidePopupPanel(true);
  // });

  async function confirmRide() {
    try {
      await axios.post(
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
  
      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (error) {
      console.error("Failed to confirm ride:", error.response?.data || error);
    }
  }
  
  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      y: ridePopupPanel ? 0 : "100%",
      duration: 0.5,
    });
  }, [ridePopupPanel]);
  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      y: confirmRidePopupPanel ? 0 : "100%",
      duration: 0.5,
    });
  }, [confirmRidePopupPanel]);
  

  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain/home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
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

import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { Link, useNavigate } from "react-router-dom";
import ConfirmRide from "../components/ConfirmRide";
import LiveTracking from "../components/LiveTracking";
import VehiclePanel from "../components/VehiclePanel";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { useEffect, useRef, useState, useContext } from "react";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [fare, setFare] = useState({});
  const [ride, setRide] = useState(null);
  const [pickup, setPickup] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log("ride");
    setWaitingForDriver(false);
    navigate("/user/riding", { state: { ride } }); // Updated navigate to include ride data
  });

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  async function findTrip() {
    setPanelOpen(false);
    setLoading(true); // Show loader

    try {
      
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(response.data);
    } catch (error) {
      console.error("Error fetching fare:", error);
      // Optionally show an error message
    } finally {
      setLoading(false); // Hide loader no matter what
      setVehiclePanel(true);
    }
  }
  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("response in home", response.data);
  }

  return (
    <div className="relative h-screen w-screen flex flex-col overflow-hidden">
      {/* Logo and Hamburger */}
      <div className="h-10 p-6 px-3 flex items-center bg-green-400 justify-between gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-3xl"
        >
          <i className="ri-menu-line"></i>
        </button>
        <div className="h-6 mb-4 text-3xl italic font-rye text-black font-medium cursor-pointer hover:underline">
          Ryde On
        </div>

        <div className="relative group">
          <button
            onClick={handleLogout}
            className="h-10 w-10 hover:bg-green-300 transition rounded-full flex items-center justify-center"
          >
            <i className="text-xl ri-logout-box-r-line text-gray-700"></i>
          </button>

          {/* Tooltip box BELOW the button */}
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            Logout
            {/* Tooltip arrow pointing up */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 z-0"></div>
          </div>
        </div>
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

          <h4 className="text-2xl font-semibold mb-4">Find a Trip</h4>
          <form onSubmit={submitHandler} className="space-y-3">
            <input
              value={pickup}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              onChange={handlePickupChange}
              placeholder="Add a pick-up location"
              className="bg-gray-200 px-4 py-2 w-full rounded-lg"
              type="text"
            />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              onChange={handleDestinationChange}
              placeholder="Enter your destination"
              className="bg-gray-200 px-4 py-2 w-full rounded-lg"
              type="text"
            />
            <button
              type="submit"
              onClick={findTrip}
              className="bg-black text-white py-2 w-full rounded-lg"
            >
              Find Trip
            </button>
          </form>

          {/* Expanding suggestion panel */}
          <div
            ref={panelRef}
            className={`overflow-y-auto transition-all rounded-lg duration-300 ${
              panelOpen ? "h-fit mt-2 p-4 pt-0 bg-gray-300" : "h-0 py-0"
            }`}
          >
            <h5
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
              className="text-2xl text-center cursor-pointer opacity-100 "
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <LocationSearchPanel
              suggestions={
                activeField === "pickup"
                  ? pickupSuggestions
                  : destinationSuggestions
              }
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
          {loading && <div className="loader m-[180px] sm:m-[130px]"></div>}
          {/* Other ride panels inside sidebar */}
          {vehiclePanel && (
            <div ref={vehiclePanelRef}>
              <VehiclePanel
                selectVehicle={setVehicleType}
                fare={fare}
                setConfirmRidePanel={setConfirmRidePanel}
                setVehiclePanel={setVehiclePanel}
              />
            </div>
          )}

          {confirmRidePanel && (
            <div ref={confirmRidePanelRef}>
              <ConfirmRide
                createRide={createRide}
                pickup={pickup}
                destination={destination}
                fare={fare}
                vehicleType={vehicleType}
                setConfirmRidePanel={setConfirmRidePanel}
                setVehicleFound={setVehicleFound}
              />
            </div>
          )}

          {vehicleFound && (
            <div ref={vehicleFoundRef}>
              <LookingForDriver
                createRide={createRide}
                pickup={pickup}
                destination={destination}
                fare={fare}
                vehicleType={vehicleType}
                setVehicleFound={setVehicleFound}
              />
            </div>
          )}

          {waitingForDriver && (
            <div ref={waitingForDriverRef}>
              <WaitingForDriver
                ride={ride}
                setVehicleFound={setVehicleFound}
                setWaitingForDriver={setWaitingForDriver}
                waitingForDriver={waitingForDriver}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

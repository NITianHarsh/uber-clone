import { useContext } from "react";
import LiveTracking from "../components/LiveTracking";
import { SocketContext } from "../context/SocketContext";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useLocation

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {}; // Retrieve ride data
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/user/home");
  });

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      {/* Home Button */}
      <Link
        to="/user/home"
        className="fixed top-4 right-4 z-10 bg-white shadow-md h-10 w-10 rounded-full flex items-center justify-center"
      >
        <i className="ri-home-5-line text-xl text-gray-700"></i>
      </Link>

      {/* Map/LiveTracking */}
      <div className="flex-1 w-full min-h-[50vh] p-1">
        <LiveTracking />
      </div>

      {/* Bottom Panel */}
      <div className="w-full bg-white p-4 sm:p-6 rounded-t-3xl shadow-lg space-y-6">
        {/* Driver Info */}
        <div className="flex items-center justify-between">
          <img
            className="h-14 w-24 object-cover rounded-lg shadow-md"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="Vehicle"
          />
          <div className="text-right">
            <h2 className="text-lg sm:text-xl font-semibold capitalize text-gray-800">
              {ride?.captain.fullname.firstname}
            </h2>
            <h4 className="text-xl sm:text-2xl font-bold text-black">
              {ride?.captain.vehicle.plate}
            </h4>
            <p className="text-sm sm:text-base text-gray-500">
              Maruti Suzuki Alto
            </p>
          </div>
        </div>

        {/* Ride Details */}
        <div className="space-y-4">
          {/* Destination */}
          <div className="flex items-start gap-4 border-b border-gray-300 pb-3">
            <i className="ri-map-pin-2-fill text-xl text-red-500 mt-1"></i>
            <div>
              <h4 className="text-md font-medium text-gray-800">Destination</h4>
              <p className="text-sm text-gray-600">{ride?.destination}</p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-start gap-4">
            <i className="ri-currency-line text-xl text-yellow-600 mt-1"></i>
            <div>
              <h4 className="text-md font-medium text-gray-800">Fare</h4>
              <p className="text-sm text-gray-600">₹{ride?.fare} - Cash</p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;

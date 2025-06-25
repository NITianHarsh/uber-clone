import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHander = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);
      navigate("/captain/riding", { state: { ride: props.ride } });
    }
  };
  return (
    <div className="relative p-5 sm:p-6 bg-white rounded-t-3xl shadow-xl space-y-5">
  {/* Close Button */}
  <h5
    className="absolute top-3 right-4 text-3xl text-gray-400 cursor-pointer"
    onClick={() => props.setRidePopupPanel(false)}
  >
    <i className="ri-arrow-down-wide-line"></i>
  </h5>

  {/* Heading */}
  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
    Confirm this ride to Start
  </h3>

  {/* Rider Info */}
  <div className="flex items-center justify-between p-4 border-2 border-yellow-400 bg-yellow-50 rounded-lg shadow-sm">
    <div className="flex items-center gap-3">
      <img
        className="h-12 w-12 rounded-full object-cover"
        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
        alt="User"
      />
      <h2 className="text-lg font-semibold capitalize text-gray-800">
        {props.ride?.user.fullname.firstname}
      </h2>
    </div>
    <h5 className="text-lg font-semibold text-gray-700">2.2 KM</h5>
  </div>

  {/* Ride Details */}
  <div className="space-y-3 divide-y">
    {/* Pickup */}
    <div className="flex items-start gap-4 pt-2">
      <i className="ri-map-pin-user-fill text-xl text-green-600 mt-1"></i>
      <div>
        <h4 className="text-md font-medium text-gray-800">Pickup</h4>
        <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
      </div>
    </div>

    {/* Destination */}
    <div className="flex items-start gap-4 pt-2">
      <i className="ri-map-pin-2-fill text-xl text-red-500 mt-1"></i>
      <div>
        <h4 className="text-md font-medium text-gray-800">Destination</h4>
        <p className="text-sm text-gray-600">{props.ride?.destination}</p>
      </div>
    </div>

    {/* Fare */}
    <div className="flex items-start gap-4 pt-2">
      <i className="ri-currency-line text-xl text-yellow-600 mt-1"></i>
      <div>
        <h4 className="text-md font-medium text-gray-800">Fare</h4>
        <p className="text-sm text-gray-600">₹{props.ride?.fare} - Cash</p>
      </div>
    </div>
  </div>

  {/* OTP + Action Buttons */}
  <form onSubmit={submitHander} className="space-y-4 pt-2">
    {/* OTP Input */}
    <input
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      type="text"
      className="w-full px-6 py-4 bg-gray-100 text-lg font-mono rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      placeholder="Enter OTP"
    />

    {/* Confirm Button */}
    <button
      type="submit"
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
    >
      Confirm
    </button>

    {/* Cancel Button */}
    <button
      type="button"
      onClick={() => {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
      }}
      className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
    >
      Cancel
    </button>
  </form>
</div>

  );
};

export default ConfirmRidePopUp;

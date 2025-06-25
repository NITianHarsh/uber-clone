import React from "react";

const WaitingForDriver = (props) => {
  const vehicleImages = {
    car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
    moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
  };
  return (
    <div className="relative p-5 sm:p-6 bg-white rounded-t-3xl shadow-xl space-y-5">
      {/* Close Button */}
      <h5
        className="absolute top-3 right-4 text-3xl text-gray-400 cursor-pointer"
        onClick={() => props.waitingForDriver(false)}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </h5>

      {/* Captain + Vehicle Info */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 shadow-sm">
        <img
          className="h-14 w-24 object-cover rounded-lg shadow-md"
          src={vehicleImages[props.vehicleType]}
          alt="Vehicle"
        />
        <div className="text-right">
          <h2 className="text-lg font-semibold capitalize text-gray-800">
            {props.ride?.captain.fullname.firstname}
          </h2>
          <h4 className="text-xl font-bold text-black -mt-1">
            {props.ride?.captain.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-500">Maruti Suzuki Alto</p>
          <h1 className="text-xl font-bold text-green-600 tracking-widest mt-1">
            OTP: {props.ride?.otp}
          </h1>
        </div>
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
    </div>
  );
};

export default WaitingForDriver;

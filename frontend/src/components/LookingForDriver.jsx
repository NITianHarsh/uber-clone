const LookingForDriver = (props) => {
  const vehicleImages = {
    car: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
    moto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
  };
  return (
    <div className="mt-5 bg-gray-100 rounded-2xl p-5 shadow-lg">
      {/* Close Button */}
      <h5
        className="text-center cursor-pointer"
        onClick={() => {
          props.setVehicleFound(false);
        }}
      >
        <i className="text-3xl text-gray-600 ri-arrow-down-wide-line"></i>
      </h5>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 mt-2 mb-6 text-center">
        Looking for a Driver...
      </h3>

      {/* Vehicle Image */}
      <div className="flex justify-center">
        <img
          className="h-20 w-32 object-contain"
          src={vehicleImages[props.vehicleType]}
          alt={props.vehicleType}
        />
      </div>

      {/* Ride Details */}
      <div className="w-full mt-6 space-y-4">
        {/* Pickup */}
        <div className="flex items-start gap-4 border-b border-gray-300 pb-3">
          <i className="ri-map-pin-user-fill text-xl text-green-600"></i>
          <div>
            <h4 className="text-md font-medium text-gray-800">Pickup</h4>
            <p className="text-sm text-gray-600">{props.pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-4 border-b border-gray-300 pb-3">
          <i className="ri-map-pin-2-fill text-xl text-red-500"></i>
          <div>
            <h4 className="text-md font-medium text-gray-800">Destination</h4>
            <p className="text-sm text-gray-600">{props.destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-4">
          <i className="ri-currency-line text-xl text-yellow-500"></i>
          <div>
            <h4 className="text-md font-medium text-gray-800">
              ₹{props.fare[props.vehicleType]}
            </h4>
            <p className="text-sm text-gray-600">Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;

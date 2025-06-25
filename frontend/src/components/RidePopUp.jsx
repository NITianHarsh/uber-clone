const RidePopUp = (props) => {
  return (
    <div className="relative p-5 sm:p-6 bg-white rounded-t-3xl shadow-xl space-y-4">
  {/* Close Button */}
  <h5
    className="absolute top-3 right-4 text-3xl text-gray-400 cursor-pointer"
    onClick={() => props.setRidePopupPanel(false)}
  >
    <i className="ri-arrow-down-wide-line"></i>
  </h5>

  {/* Heading */}
  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
    New Ride Available!
  </h3>

  {/* Rider Info */}
  <div className="flex items-center justify-between p-4 bg-yellow-100 rounded-lg shadow-sm">
    <div className="flex items-center gap-3">
      <img
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover"
        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
        alt="User"
      />
      <h2 className="text-lg font-semibold text-gray-800">
        {props.ride?.user.fullname.firstname +
          " " +
          props.ride?.user.fullname.lastname}
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

  {/* Action Buttons */}
  <div className="pt-4 space-y-2">
    <button
      onClick={() => {
        props.setConfirmRidePopupPanel(true);
        props.confirmRide();
      }}
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold rounded-lg transition"
    >
      Accept Ride
    </button>
    <button
      onClick={() => props.setRidePopupPanel(false)}
      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 font-semibold rounded-lg transition"
    >
      Ignore
    </button>
  </div>
</div>

  );
};

export default RidePopUp;

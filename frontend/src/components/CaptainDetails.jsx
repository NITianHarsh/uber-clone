import { useContext } from "react";
import { CaptainDataContext } from "../context/CapatainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div className="p-4 bg-white rounded-2xl shadow-sm space-y-6">
      {/* Profile & Earnings */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover shadow"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt="Captain Avatar"
          />
          <h4 className="text-lg font-semibold capitalize text-gray-800">
            {captain.fullname.firstname + " " + captain.fullname.lastname}
          </h4>
        </div>
        <div className="text-right">
          <h4 className="text-xl font-bold text-green-600">₹295.20</h4>
          <p className="text-sm text-gray-500">Earned</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl shadow-inner">
        <div className="text-center">
          <i className="ri-timer-2-line text-2xl text-gray-700 mb-1 block"></i>
          <h5 className="text-lg font-medium text-gray-800">10.2</h5>
          <p className="text-sm text-gray-500">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="ri-speed-up-line text-2xl text-gray-700 mb-1 block"></i>
          <h5 className="text-lg font-medium text-gray-800">18</h5>
          <p className="text-sm text-gray-500">Trips Completed</p>
        </div>
        <div className="text-center">
          <i className="ri-booklet-line text-2xl text-gray-700 mb-1 block"></i>
          <h5 className="text-lg font-medium text-gray-800">4.8</h5>
          <p className="text-sm text-gray-500">Avg Rating</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;

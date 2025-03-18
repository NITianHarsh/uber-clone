import React, { useContext, useEffect } from "react";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext.jsx";

const CaptainDetails = () => {
  const { captain, setCaptain, isLoading, setIsLoading, error, setError } =
    useContext(CaptainDataContext);

  useEffect(() => {
    const fetchCaptainData = async () => {
      setIsLoading(true);

      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCaptain(response.data);
      } catch (err) {
        setError("Failed to load captain data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptainData();
  }, [setCaptain, setIsLoading, setError]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={
              captain?.profilePicture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            }
            alt="Captain Profile"
          />
          <h4 className="text-lg font-medium capitalize">
            {captain?.fullname
              ? `${captain.fullname.firstname ?? ""} ${
                  captain.fullname.lastname ?? ""
                }`.trim()
              : "Captain"}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">
            ₹{captain?.earnings?.toFixed(2) ?? "0.00"}
          </h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">
            {captain?.hoursOnline ?? "0.0"}
          </h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">
            {captain?.tripsCompleted ?? "0"}
          </h5>
          <p className="text-sm text-gray-600">Trips Completed</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">{captain?.rating ?? "0.0"}</h5>
          <p className="text-sm text-gray-600">Ratings</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;

import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CapatainContext";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain/home");
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <Link to="/">
        <div
          className="h-6 mb-4 absolute top-8 left-8 text-3xl italic font-rye text-black font-medium cursor-pointer hover:underline"
        >Ryde On</div>
      </Link>
      <div className="w-full max-w-md bg-white border border-black rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl italic font-bold text-center text-black">
            Captain Signup
          </h2>
          <p className="text-md text-gray-500 text-center mt-2">
            Join as a captain by filling in your details
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex gap-4">
            <input
              required
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 px-4 py-2 border border-black rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <input
              required
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 px-4 py-2 border border-black rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <input
            required
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
          />

          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
          />

          <div className="text-black font-medium">Vehicle Information</div>

          <div className="flex gap-4">
            <input
              required
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="w-1/2 px-4 py-2 border border-black rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <input
              required
              type="text"
              placeholder="Vehicle Plate No."
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className="w-1/2 px-4 py-2 border border-black rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="flex gap-4">
            <input
              required
              type="number"
              placeholder="Capacity min 1"
              min="1"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="w-1/2 px-4 py-2 border border-black rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <select
              required
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-1/2 px-4 py-2 border border-black rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-opacity-90 transition duration-300"
          >
            {loading ? "Creating account..." : "Create Captain Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-black">
          Already have an account?{" "}
          <Link to="/captain/login" className="underline hover:text-gray-700">
            Login here
          </Link>
        </p>

        <p className="mt-6 text-[10px] text-center leading-tight text-gray-500">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;

import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext.jsx";

const CaptainSignup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (vehicleCapacity < 1) {
      setError("Vehicle capacity must be at least 1.");
      setLoading(false);
      return;
    }

    const fullname = {
      firstname: firstName,
      ...(lastName && { lastname: lastName }),
    };

    const newCaptain = {
      fullname,
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newCaptain,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain/home");

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setVehicleColor("");
        setVehiclePlate("");
        setVehicleCapacity(1);
        setVehicleType("car");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-3"
          src="https://logodix.com/logo/81070.png"
          alt="Uber-Logo"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={submitHandler}>
          <h3 className="text-base font-medium mb-2">
            What's our Captain's name
          </h3>
          <div className="flex gap-2 mb-5">
            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <h3 className="text-base font-medium mb-2">Vehicle Details</h3>
          <div className="flex gap-2 mb-3">
            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="text"
              placeholder="Vehicle Plate No. XX-XX-XXXX"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />{" "}
          </div>
          <div className="flex gap-2 mb-5">
            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="number"
              min="1"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) =>
                setVehicleCapacity(Number(e.target.value))
              }
            />
            <select
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base"
              value={vehicleType}
              defaultValue=""
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>Select a Vehicle</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>{" "}
          </div>
          <h3 className="text-base font-medium mb-2">
            What's our Captain's email
          </h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#111] text-white cursor-pointer font-semibold mb-3 rounded px-4 py-2 w-full"
          >
            {loading ? "Creating..." : "Create an Account"}
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/captain/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p>
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;

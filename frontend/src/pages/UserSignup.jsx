import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/user/home");
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <Link to="/">
        <img
          className="h-6 mb-4 absolute top-8 left-8"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="Logo"
        />
      </Link>
      <div className="w-full max-w-md bg-white border border-black rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl font-bold italic text-center text-black">
            Create Account
          </h2>
          <p className="text-md text-gray-500 text-center mt-2">
            Join us by filling the form below
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
              className="w-1/2 px-4 py-2 border border-black rounded-md placeholder-gray-400 text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
            <input
              required
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 px-4 py-2 border border-black rounded-md placeholder-gray-400 text-black focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <input
            required
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-md placeholder-gray-400 text-black focus:outline-none focus:ring-1 focus:ring-black"
          />

          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-black rounded-md placeholder-gray-400 text-black focus:outline-none focus:ring-1 focus:ring-black"
          />

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-opacity-90 transition duration-300"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-black">
          Already have an account?{" "}
          <Link to="/user/login" className="underline hover:text-gray-700">
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

export default UserSignup;

import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CapatainContext";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { email, password }
      );

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain/home");
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
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
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl italic font-bold text-center text-black">
            Captain Login
          </h2>
          <p className="text-md text-gray-500 text-center mt-2">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-md font-medium mb-1 text-black">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-2 border border-black rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-md font-medium mb-1 text-black">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-black rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-opacity-90 transition duration-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-black">
          New to the fleet?{" "}
          <Link to="/captain/signup" className="underline hover:text-gray-700">
            Register as a Captain
          </Link>
        </p>

        <div className="mt-6">
          <Link
            to="/user/login"
            className="w-full block text-center py-2 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-opacity-90 transition duration-300"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;

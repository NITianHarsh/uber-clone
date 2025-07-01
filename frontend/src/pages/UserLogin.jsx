import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        { email, password }
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/user/home");
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Login failed. Please check credentials."
      );
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-white px-4 py-8">
      <Link to="/">
        <div
          className="h-6 mb-4 absolute top-8 left-8 text-3xl italic font-rye text-black font-medium cursor-pointer hover:underline"
        >Ryde On</div>
      </Link>
      <div className="w-full max-w-md bg-white border border-black rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-3xl font-bold italic text-center text-black">
            User Login
          </h2>
          <p className="text-md text-gray-500 text-center mt-2">
            Enter your credentials below
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
          New here?{" "}
          <Link to="/user/signup" className="underline hover:text-gray-700">
            Create a new account
          </Link>
        </p>

        <div className="mt-6">
          <Link
            to="/captain/login"
            className="w-full block text-center py-2 px-4 bg-orange-600 text-white font-semibold rounded-md hover:bg-opacity-90 transition duration-300"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

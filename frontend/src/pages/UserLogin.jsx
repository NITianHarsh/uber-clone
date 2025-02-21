import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        { email, password }
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        {" "}
        <img className="w-16 mb-3 " src="https://logodix.com/logo/81070.png" />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium  mb-2">Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center">
            New Here?{" "}
            <Link to="/user/signup" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captain/login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;

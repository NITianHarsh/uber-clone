import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
   const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [userData, setuserData] = useState({});
    const submitHandler = () => {
      e.preventDefault();
      setuserData({
        email: email,
        password: password,
      });
      setemail("");
      setpassword("");
    };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div>
      {" "}
      <img
        className="w-16 mb-3 "
        src="https://logodix.com/logo/81070.png"
      />
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
            setemail(e.target.value);
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
            setpassword(e.target.value);
          }}
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          type="password"
          placeholder="password"
        />
        <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full">
          Login
        </button>
        <p className="text-center">
          Join a fleet{" "}
          <Link to="/captain-signup" className="text-blue-600">
          Register as a Captain
          </Link>
        </p>
      </form>
    </div>
    <div>
      <Link to='/login' className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full">
        Sign in as User
      </Link>
    </div>
  </div>
  )
}

export default CaptainLogin

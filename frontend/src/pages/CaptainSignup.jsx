import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const CaptainSignup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userData, setuserData] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setuserData({
      fullname: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    setemail("");
    setpassword("");
    setfirstName("");
    setlastName("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        {" "}
        <img className="w-16 mb-3 " src="https://logodix.com/logo/81070.png" />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-base font-medium mb-2">
            What's our Captain's name
          </h3>
          <div className="flex gap-2 mb-5">
            <input
              required
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
            />
            <input
              required
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-sm"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setlastName(e.target.value);
              }}
            />
          </div>
          <h3 className="text-base font-medium mb-2">
            {" "}
            What's our Captain's email
          </h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <h3 className="text-base font-medium  mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full">
            Login
          </button>
          <p className="text-center">
            Already have a account?{" "}
            <Link to="/captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p>
          {" "}
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline"> Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;

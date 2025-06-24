import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSignup = () => {
  const [userData, setUserData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });

  async function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <div className="p-7 flex h-screen flex-col justify-between   ">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={submitHandler}>
          <h3 className=" text-base font-medium mb-2">What's your name</h3>
          <div className="flex gap-4">
            <input
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-base  placeholder:text-base "
              type="text"
              required
              value={userData.fullname.firstname}
              onChange={(e) => {
                e.preventDefault();
                setUserData({
                  ...userData,
                  fullname: { ...userData.fullname, firstname: e.target.value },
                });
              }}
              placeholder="First name"
            />
            <input
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-base  placeholder:text-base "
              type="text"
              required
              value={userData.fullname.lastname}
              onChange={(e) => {
                e.preventDefault();
                setUserData({
                  ...userData,
                  fullname: { ...userData.fullname, lastname: e.target.value },
                });
              }}
              placeholder="Last name"
            />
          </div>
          <h3 className=" text-base font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-base  placeholder:text-base "
            type="email"
            required
            value={userData.email}
            onChange={(e) => {
              e.preventDefault();
              setUserData({ ...userData, email: e.target.value });
            }}
            placeholder="john@doe.com"
          />
          <h3 className="text-base font-medium   mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-base  placeholder:text-base "
            type="password"
            value={userData.password}
            onChange={(e) => {
              e.preventDefault();
              setUserData({ ...userData, password: e.target.value });
            }}
            placeholder="Password"
          />
          <button className="bg-[#111111] text-white mb-5 rounded px-4 py-2  w-full text-base   ">
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account ?{" "}
          <Link to="/captain-login" className="text-blue-600 ">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight text-gray-500">
          This site is protected by reCAPTCHA and{" "}
          <span>the Google Privacy Policy </span> and{" "}
          <span>Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;

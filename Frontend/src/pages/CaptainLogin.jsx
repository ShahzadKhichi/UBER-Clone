import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const CaptainLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  async function submitHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    if (!userData.email || !userData.password) {
      alert("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/login`,
      userData
    );
    setIsLoading(false);
    if (response.status === 200) {
      localStorage.setItem("captain", JSON.stringify(response.data));
      localStorage.setItem("captainToken", response.data.token);
      navigate("/captain-home");
    } else {
      alert("Invalid email or password");
    }
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
            Login
          </button>
        </form>
        <p className="text-center">
          New here ?{" "}
          <Link to="/captain-signup" className="text-blue-600 ">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to={"/login"}
          className="bg-yellow-300   flex items-center justify-center   text-black mb-7 rounded px-4 py-2  w-full text-base   "
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;

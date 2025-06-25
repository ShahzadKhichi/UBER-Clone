import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../Context/CaptainContext.jsx";
const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [userData, setUserData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });

  const [vechicleData, setVechicleData] = useState({
    color: "",
    plateNumber: "",
    capacity: "",
    type: "car",
  });

  async function submitHandler(e) {
    e.preventDefault();
    const captainData = {
      ...userData,
      vehicle: vechicleData,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captain/register`,
      captainData
    );

    if (response.status === 201) {
      alert("Captain account created successfully");
      setCaptain({
        ...captainData,
        token: response.data.token,
        password: undefined,
      });
      localStorage.setItem("captain", JSON.stringify(captainData));
      localStorage.setItem("captainToken", response.data.token);
      navigate("/captain-home");
    } else {
      alert("Failed to create captain account");
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

          <h3 className=" text-base font-medium mb-2">Vehicle Information </h3>
          <div>
            <div className="flex gap-4">
              <input
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-base  placeholder:text-base "
                type="text"
                required
                value={vechicleData.color}
                onChange={(e) => {
                  e.preventDefault();
                  setVechicleData({ ...vechicleData, color: e.target.value });
                }}
                placeholder="Vehicle color"
              />
              <input
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-base  placeholder:text-base "
                type="number"
                required
                value={vechicleData.plateNumber}
                onChange={(e) => {
                  e.preventDefault();
                  setVechicleData({
                    ...vechicleData,
                    plateNumber: e.target.value,
                  });
                }}
                placeholder="Vehicle plate number "
              />
            </div>
            <div className="flex gap-4">
              <input
                className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-base  placeholder:text-base "
                type="number"
                required
                value={vechicleData.capacity}
                onChange={(e) => {
                  e.preventDefault();
                  setVechicleData({
                    ...vechicleData,
                    capacity: e.target.value,
                  });
                }}
                placeholder="Vehicle capacity"
              />
              <select
                name="type"
                id="type"
                className="bg-[#eeeeee] mb-7 rounded   py-2 border w-1/2 text-base  placeholder:text-base "
                onChange={(e) => {
                  setVechicleData({
                    ...vechicleData,
                    type: e.target.value,
                  });
                  console.log(vechicleData);
                }}
              >
                <option disabled>Select a vehicle</option>
                <option value="car">car</option>
                <option value="bike">bike</option>
                <option value="auto">auto</option>
              </select>
            </div>
          </div>

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

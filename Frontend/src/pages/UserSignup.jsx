import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";

const UserSignup = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [userData, setUserData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });
  console.log(user);

  async function submitHandler(e) {
    e.preventDefault();

    console.log("here");

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      userData
    );
    console.log("here");

    console.log(response);

    if (response.status === 201) {
      setUser({
        fullname: response.data.user.fullname,
        email: response.data.user.email,
        id: response.data.user.id,
        token: response.data.token,
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      navigate("/home");
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
          <Link to="/login" className="text-blue-600 ">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight text-gray-500">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;

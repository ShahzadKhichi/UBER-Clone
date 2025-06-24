import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-[url(https://drivingtestsuccess.com/wp-content/uploads/2025/05/green-filter-arrow.jpg)] bg-center bg-cover h-screen pt-8  w-full flex justify-between flex-col bg-red-400">
        <img
          className="w-10 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white py-4 px-4">
          <h2 className="text-3xl font-bold ">Get Started with Uber</h2>
          <Link
            to="/login"
            className="w-full flex items-center justify-center bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;

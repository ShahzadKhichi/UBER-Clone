import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useRef } from "react";
import LocationPanel from "../Components/LocationPanel";

const Home = () => {
  const panelRef = useRef(null);
  const [data, setData] = useState({
    pickup: "",
    destination: "",
  });
  const [panelOpen, setPanelOpen] = useState(false);
  console.log(panelOpen);

  // useGSAP(() => {
  //   if (panelOpen) {
  //     gsap.to(panelRef.current, {
  //       height: "70%",
  //     });
  //   } else {
  //     gsap.to(panelRef.current, {
  //       height: "0%",
  //     });
  //   }
  // }, [panelOpen]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="h-screen relative">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="logo"
      />
      <div className="h-screen w-screen">
        {/* image for temporary use*/}
        <img
          className=" h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="flex  flex-col justify-end h-screen absolute rounded top-0  w-full">
        <div className="bg-white p-5 h-[30%] relative">
          <div className="h-16 w-1 absolute top-[45%] bg-gray-700 left-10 rounded-full "></div>
          <h5
            className={`absolute top-6 right-6 opacity-[${panelOpen ? 1 : 0}]`}
            onClick={() => setPanelOpen(false)}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold ">Find a trip</h4>
          <form onSubmit={onSubmitHandler} className="flex flex-col">
            <input
              value={data.pickup}
              onChange={(e) => {
                setData({ ...data, pickup: e.target.value });
              }}
              className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up loaction"
              onClick={() => setPanelOpen(true)}
            />
            <input
              value={data.destination}
              onChange={(e) =>
                setData({ ...data, destination: e.target.value })
              }
              className="bg-[#eee] px-8 py-2 text-base rounded-lg w-full mt-3 "
              type="text"
              placeholder="Enter your destination"
              onClick={() => setPanelOpen(true)}
            />
          </form>
        </div>
        <div
          ref={panelRef}
          className={`bg-red-300 h-[${
            panelOpen ? "70%" : "0%"
          }] transition-all duration-600`}
        >
          <LocationPanel></LocationPanel>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { useHistory } from "react-router-dom";
import "./GenderBanner.css";

const GenderBanner = () => {
  const history = useHistory();
  return (
    <div className="flex flex-col gap-2 mt-2 md:flex-row md:gap-0">
      <div className="relative flex-1 pr-1 overflow-hidden sex-img" onClick={() => history.push("/")}>
        <img className="w-full cursor-pointer" src="https://www.mcshop.com/mcshop/v1/media/Banner%20Cat-02.jpg?width=1280" alt="" />
      </div>
      <div className="relative flex-1 pl-1 overflow-hidden sex-img" onClick={() => history.push("/")}>
        <img className="w-full cursor-pointer" src="https://www.mcshop.com/mcshop/v1/media/Banner%20Cat-01.jpg?width=1280" alt="" />
      </div>
    </div>
  );
};

export default GenderBanner;

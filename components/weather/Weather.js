"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import IconData from "lib/weatherCode.json";
function Weather() {
  const [weatherLocationData, setWeatherLocationData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [iconPath, setIconPath] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchData(cityName) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName // using query parameters to get city name
      );
      const data = await response.json();
      if (data && !data.response.error) {
        setErrorMsg("");
        setWeatherLocationData(data.response);
        fetchIcon(data.response.current.condition.code);
      } else {
        setErrorMsg("Invailid Location Specified");
      }
    } catch (error) {
      alert(error);
    }
  }

  function fetchIcon(searchCode) {
    for (const item of IconData) {
      console.log(item);
      if (item.code === searchCode) {
        // dont need /public/... since our public folder is in our root
        let path = "/weatherIcons/day/" + item.icon + ".png";
        setIconPath(path);
        return path;
      }
    }
  }

  useEffect(() => {
    fetchData("13346");
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchData(cityName);
    setCityName("");
  }

  return (
    <div className="h-screen grid place-content-center">
      <div className="bg-navy px-[15vw] min-px-[100vw] pt-12 pb-[10vh] rounded-md shadow-lg">
        <form className="flex gap-2 translate-x-8" onSubmit={handleSearch}>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="rounded-full shadow-lg h-12 bg-slate-300 p-6 outline-none text-black"
            placeholder="Enter your Location"
          ></input>
          <button
            type="submit"
            className="bg-sky-500 rounded-full p-2.5 hover:bg-sky-600 shadow-lg text-gray ease-in duration-100"
          >
            Search
          </button>
        </form>
        <div className="pt-3">
          <h2
            className={
              errorMsg
                ? "bg-red-300 rounded-md p-2 shadow-md flex justify-center"
                : "hidden"
            }
          >
            {errorMsg ? errorMsg : ""}
          </h2>
        </div>
        <div className="grid place-items-center pt-4">
          {/* TODO: make the text fade in instead of blinking into existence  */}
          <Image
            src={iconPath ? iconPath : ""}
            alt="weatherIcon"
            className="flex justify-center"
            width={86}
            height={86}
          />
          {/* makes sure that we are showing loading if we do not have data yet */}
          {/* City */}
          <h1 className="text-[2vw] flex justify-center">
            {weatherLocationData ? weatherLocationData.location.name : "--"}
          </h1>
          {/* Country and Region Info */}
          <div className="flex justify-center gap-2">
            <h3 className="">
              {weatherLocationData ? weatherLocationData.location.region : "--"}
            </h3>
          </div>
          {/* High and Low temp */}
          <div className="flex justify-center gap-2">
            <h4>
              {weatherLocationData
                ? weatherLocationData.current.temp_f +
                  "°F" +
                  " | " +
                  weatherLocationData.current.condition.text
                : "--"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

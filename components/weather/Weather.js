"use client";
import React, { useEffect, useState } from "react";
import { FaCloudShowersHeavy } from "react-icons/fa";
function Weather() {
  const [weatherLocationData, setWeatherLocationData] = useState(null);
  const [cityName, setCityName] = useState("");

  async function fetchData(cityName) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName // using query parameters to get city name
      );
      const data = await response.json();
      if (data) {
        setWeatherLocationData(data.response);
      }
      console.log("data", data.response.location);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData("13346");
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    fetchData(cityName);
  }

  return (
    <div className="h-screen grid place-content-center">
      <div className="bg-slate-400 px-64 pt-12 pb-64 rounded-md shadow-lg">
        <form className="flex gap-2 translate-x-8" onSubmit={handleSearch}>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="rounded-full shadow-lg h-12 bg-slate-300 p-6 outline-none autofill-none"
            placeholder="Enter your Location:"
          ></input>
          <button
            type="submit"
            className="bg-slate-500 rounded-full p-2.5 hover:bg-slate-600"
          >
            Search
          </button>
        </form>
        <div className="grid place-items-center pt-4 gap-4">
          {/* TODO: Change out this temp image
              TODO: make the text fade in instead of blinking into existence  */}
          <FaCloudShowersHeavy className="text-[18vw] flex justify-center pt-4" />
          {/* makes sure that we are showing loading if we do not have data yet */}
          <h1 className="text-[4vw] flex justify-center">
            {weatherLocationData
              ? weatherLocationData.location.name
              : "loading..."}
          </h1>
          <div className="flex justify-center gap-2">
            <h3 className="">
              {weatherLocationData
                ? weatherLocationData.location.country
                : "loading..."}
            </h3>
            <h3>{weatherLocationData ? "|" : ""}</h3>
            <h3 className="">
              {weatherLocationData ? weatherLocationData.location.region : ""}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

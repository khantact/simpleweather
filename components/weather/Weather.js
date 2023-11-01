"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import IconData from "lib/weatherCode.json";
function Weather() {
  const [weatherLocationData, setWeatherLocationData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [iconPath, setIconPath] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch data from weatherapi from our backend api
  // Reason why we're using a backend api instead of directly calling it here is because
  // I want to use environment variables for our api key and those don't work when you have
  // "use client" in nextjs for whatever reason
  async function fetchData(cityName) {
    try {
      let apiUrl = "";
      const environment = process.env.NODE_ENV;
      if (environment === "development") {
        apiUrl = "http://localhost:3000/api/weather?address=" + cityName;
      } else if (environment === "production") {
        apiUrl =
          "https://simpleweather-one.vercel.app/api/weather?address=" +
          cityName;
      }
      const response = await fetch(apiUrl);
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
  // Get us the appropriate weather icon based on the weather code returned to us from api
  function fetchIcon(searchCode) {
    for (const item of IconData) {
      if (item.code === searchCode) {
        // dont need /public/... since our public folder is in our root
        let path = "/weatherIcons/day/" + item.icon + ".png";
        setIconPath(path);
        return path;
      }
    }
  }

  // Use this to initially load Hamilton,NY for our city this runs once since our dependency array is empty
  useEffect(() => {
    fetchData("13346");
  }, []);

  function handleSearch(e) {
    e.preventDefault(); // Prevent page from refreshing
    fetchData(cityName);
    setCityName(""); // clear the form input
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
          {/* Temp */}
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
          {/* Feels like */}
          <div className="flex justify-center gap-2">
            <h4>
              {weatherLocationData
                ? "Feels like " + weatherLocationData.current.feelslike_f + "°F"
                : "--"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

"use client";
import React, { useEffect } from "react";

function Weather() {
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=13346&aqi=no`;
  useEffect(() => {
    const getData = async () => {
      const query = await fetch(apiUrl);
      const response = await query.json();
      console.log("response", response);
      console.log("this should print the key:", process.env.WEATHER_KEY);
      console.log("this should print the url:", apiUrl);
    };
    getData();
  });
  return (
    <div className="h-screen grid place-content-center">
      <div className="bg-slate-400 px-64 pt-12 pb-64 rounded-md shadow-lg">
        <form>
          <input
            type="text"
            id="location"
            className="rounded-full shadow-md h-12 bg-slate-300 p-4"
            placeholder="Enter your Location:"
          ></input>
        </form>
        <div className="flex justify-center">test</div>
      </div>
    </div>
  );
}

export default Weather;

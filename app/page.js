import React from "react";
import Weather from "../components/weather/Weather";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-slate-200 text-gray">
      <Weather />
    </div>
  );
}

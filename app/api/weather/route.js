import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("address");
  let apiURL = "";
  console.log("In the get");
  if (city) {
    apiURL = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=${city}&aqi=no`;
  } else {
    console.log(process.env.WEATHER_KEY);
    apiURL = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=13346&aqi=no`;
  }
  try {
    const query = await fetch(apiURL);
    const response = await query.json();
    return NextResponse.json({ response });
  } catch (e) {
    console.log(e);
  }
}

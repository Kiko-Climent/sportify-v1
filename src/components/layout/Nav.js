import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserLocation } from "../../redux/slices/userLocationSlice";
import { Link } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  const [dateInfo, setDateInfo] = useState({ day: "", date: "" });
  const [weatherInfo, setWeatherInfo] = useState({ location: "", temp: "" });

  useEffect(() => {
    // Get the date
    const now = new Date();
    const options = { weekday: "long", day: "numeric", month: "short" };
    const formattedDate = now.toLocaleDateString("en-US", options);
    const [day, date] = formattedDate.split(", ");
    setDateInfo({ day, date });

    // Get weather and location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(setUserLocation({ latitude, longitude }));

        const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        fetch(url)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            setWeatherInfo({
              location: data.name,
              temp: `${Math.round(data.main.temp)}°C`,
            });
          })
          .catch((err) => console.error("Error fetching weather data:", err));


      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true }
    );
  }, [dispatch]);

  return (
    <nav className="uppercase px-3 fixed z-10 bg-bg_color w-full flex justify-between text-highlight tracking-wider blur-[0.5px] w-full overflow-hidden">
      <h1 className="text-3xl py-2 scale-y-150">
        <Link to='/home' className="hover:blur-[2px]">sportify</Link>
      </h1>
      <div className="flex-col text-xs leading-3 align-top font-bold py-3 scale-y-150">
        <ul>
          <li>{dateInfo.day}, {dateInfo.date}</li>
          <li>{weatherInfo.location} | {weatherInfo.temp}</li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;

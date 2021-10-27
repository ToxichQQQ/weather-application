import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Navbar } from "./components/Navbar";
import { MainContent } from "./components/MainContent";
import { CitiesList } from "./components/CitiesList";
import { TodayWeather } from "./components/TodayWeather";
import { API_KEY } from "./config";
import { Route } from "react-router-dom";

const useStyles = makeStyles((them) => ({
  navBar: {},
}));

export const App = () => {
  const [selectedCity, setSelectedCity] = useState("Moscow");
  const [cityInfo, setCityInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState();
  const [isError, setIsError] = useState(false);

  const getCityInformation = (
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}`
  ) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setCityInfo(data);
        setLocation({ lat: data.coord.lat, lon: data.coord.lon });
        setLoading(false);
      });
  };

  useEffect(() => {
    if (selectedCity) {
      getCityInformation();
    }
  }, [selectedCity]);

  useEffect(() => {
    let geolocation = navigator.geolocation;
    geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      getCityInformation(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
      );
    });
  }, []);

  return (
    !loading &&
    !isError && (
      <div>
        <Navbar setSelectedCity={setSelectedCity} />
        <MainContent cityInfo={cityInfo} />
        <Route exact path="/">
          <CitiesList />
        </Route>
        <Route path="/today">
          <TodayWeather
            getCityInformation={getCityInformation}
            location={location}
            setCityInfo={setCityInfo}
            cityInfo={cityInfo}
          />
        </Route>
      </div>
    )
  );
};

import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { MainContent } from "./components/MainContent";
import { CitiesList } from "./components/CitiesList";
import { TodayWeather } from "./components/TodayWeather";
import { API_KEY } from "./config";
import { Route } from "react-router-dom";
import { WeekWeather } from "./components/WeekWeather";

export const App = () => {
  const [selectedCity, setSelectedCity] = useState("Moscow");
  const [cityInfo, setCityInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState();
  const [isError, setIsError] = useState(false);
  const [savedCities, setSavedCities] = useState([
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
    { name: "" },
  ]);

  const saveNewCity = () => {
    setSavedCities((prevData) => {
      const emptyNameIndex = prevData.findIndex(({ name }) => name === "");
      if (emptyNameIndex < 0) {
        return prevData;
      }
      prevData[emptyNameIndex].name = selectedCity;
      return [...prevData];
    });
  };

  const clearCity = (index) => () => {
    setSavedCities((prevData) => {
      prevData[index].name = "";
      return [...prevData];
    });
  };

  const getCityInformation = (
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}`
  ) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setCityInfo(data);
        setLocation({ lat: data.coord.lat, lon: data.coord.lon });
        setLoading(false);
      })
      .catch((err) => alert("Error"));
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
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => setSelectedCity(data.name));
    });
  }, []);

  return (
    !loading &&
    !isError && (
      <div>
        <Navbar setSelectedCity={setSelectedCity} />
        <MainContent cityInfo={cityInfo} saveNewCity={saveNewCity} />
        <Route exact path="/">
          <CitiesList
            setSelectedCity={setSelectedCity}
            savedCities={savedCities}
            setSavedCities={setSavedCities}
            clearCity={clearCity}
          />
        </Route>
        <Route path="/today">
          <TodayWeather
            getCityInformation={getCityInformation}
            location={location}
            setCityInfo={setCityInfo}
            cityInfo={cityInfo}
            isToday
          />
        </Route>
        <Route path="/tomorrow">
          <TodayWeather
            getCityInformation={getCityInformation}
            location={location}
            setCityInfo={setCityInfo}
            cityInfo={cityInfo}
            isToday={false}
          />
        </Route>
        <Route path="/week">
          <WeekWeather
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

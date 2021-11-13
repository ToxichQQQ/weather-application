import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { MainContent } from "./components/MainContent";
import { CitiesList } from "./components/CitiesList";
import { TodayWeather } from "./components/TodayWeather";
import { API_KEY } from "./config";
import { Route } from "react-router-dom";
import { WeekWeather } from "./components/WeekWeather";
import { RegistrationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";
import { getCities } from "./localhost";
export const App = () => {
  const [selectedCity, setSelectedCity] = useState("Moscow");
  const [cityInfo, setCityInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || undefined
  );
  const [location, setLocation] = useState();
  const [savedCities, setSavedCities] = useState([]);

  const getCityInformation = (
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}`
  ) => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        if (!data.message) {
          setCityInfo(data);
          setLocation({ lat: data.coord.lat, lon: data.coord.lon });
          setLoading(false);
        } else {
          alert(data.message);
        }
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
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.message) {
            setSelectedCity(data.name);
          } else {
            alert(data.message);
          }
        });
    });

    fetch(getCities, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName,
      }),
    })
      .then((response) => response.json())
      .then((data) => data.message || setSavedCities(data));
  }, []);
  return (
    !loading && (
      <div>
        <Route path="/registration">
          <RegistrationPage />
        </Route>
        <Route path="/login">
          <LoginPage setUserName={setUserName} />
        </Route>
        <Route exact path="/main">
          <Navbar userName={userName} setSelectedCity={setSelectedCity} />
          <MainContent
            city={selectedCity}
            setSavedCities={setSavedCities}
            cityInfo={cityInfo}
          />
          <CitiesList
            setSelectedCity={setSelectedCity}
            savedCities={savedCities}
            setSavedCities={setSavedCities}
          />
        </Route>
        <Route path="/today">
          <Navbar setSelectedCity={setSelectedCity} />
          <MainContent
            city={selectedCity}
            cityInfo={cityInfo}
            setSavedCities={setSavedCities}
          />
          <TodayWeather
            getCityInformation={getCityInformation}
            location={location}
            setCityInfo={setCityInfo}
            cityInfo={cityInfo}
            isToday
          />
        </Route>
        <Route path="/tomorrow">
          <Navbar setSelectedCity={setSelectedCity} />
          <MainContent
            city={selectedCity}
            cityInfo={cityInfo}
            setSavedCities={setSavedCities}
          />
          <TodayWeather
            getCityInformation={getCityInformation}
            location={location}
            setCityInfo={setCityInfo}
            cityInfo={cityInfo}
            isToday={false}
          />
        </Route>
        <Route path="/week">
          <Navbar setSelectedCity={setSelectedCity} />
          <MainContent city={selectedCity} cityInfo={cityInfo} />
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

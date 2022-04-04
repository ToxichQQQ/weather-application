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
import { makeStyles } from "@material-ui/core";
import Redirect from "react-router-dom/es/Redirect";

const useStyles = makeStyles((them) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
}));

export const App = () => {
  const classes = useStyles();
  const [date, setDate] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Moscow");
  const [cityInfo, setCityInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || undefined
  );

  const [location, setLocation] = useState();
  const [savedCities, setSavedCities] = useState([]);
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

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
      <div className={classes.container}>
        <Route path="/registration">
          <RegistrationPage />
        </Route>
        <Route path="/login">
          <LoginPage setUserName={setUserName} />
        </Route>
        <Route path="/main">
          <Navbar
              token={token}
              setToken={setToken}
            userName={userName}
            setSelectedCity={setSelectedCity}
            city={selectedCity}
          />
          <MainContent
            city={selectedCity}
            setSavedCities={setSavedCities}
            cityInfo={cityInfo}
            savedCities={savedCities}
          />
          <CitiesList
            setSelectedCity={setSelectedCity}
            savedCities={savedCities}
            setSavedCities={setSavedCities}
          />
        </Route>
        <Route path="/today">
          <Navbar
              date={date}
              token={token}
              setToken={setToken}
            setSelectedCity={setSelectedCity}
            isToday
            city={selectedCity}
          />
          <TodayWeather
              date={date}
              setDate={setDate}
            getCityInformation={getCityInformation}
            location={location}
            setCityInfo={setCityInfo}
            cityInfo={cityInfo}
            isToday
          />
        </Route>
        <Route path="/week">
          <Navbar setSelectedCity={setSelectedCity} city={selectedCity} token={token}
                  setToken={setToken}/>
          <MainContent
            city={selectedCity}
            cityInfo={cityInfo}
            setSavedCities={setSavedCities}
            savedCities={savedCities}
          />
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

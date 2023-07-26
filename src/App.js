// React hooks and auth provider
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { currentArea, currentLoc } from "./redux/slices/global/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//Components
import Forecast from "./components/Forecast";
import Heading from "./components/Heading";
import Main from "./components/Main";
import HourlyForecast from "./components/HourlyForecast";
import Login from "./components/Login";
//Style
import "./assets/style/style.scss";
//Bg
import { clear } from "./assets/img/icons/weatherIcons";

import { IP_API_KEY } from "./API.ts";
const REACT_IP_API_KEY = IP_API_KEY;

function App() {
  const [unit, setUnit] = useState("C");
  const [currentZone, setCurrentZone] = useState(null);
  const [bgPhrase, setBgPhrase] = useState("empty");
  const [bgColor, setBgColor] = useState("");

  const keyLoc = useSelector((state) => state.global.selectedLoc);
  const myTheme = useSelector((state) => state.global.theme);
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      mode: myTheme,
    },
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`https://ipinfo.io/json?token=${REACT_IP_API_KEY}`, {
      signal: signal,
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(currentLoc(res.loc));
        dispatch(currentArea({ city: res.city, region: res.region }));
        setCurrentZone({
          city: res.city,
          region: res.region,
          loc: res.loc,
        });
      })
      .catch((err) => console.log(err));

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let clName = "cloud_day";
    if (clear.includes(bgPhrase)) {
      clName = "clear_day";
    }
    setBgColor(clName);
  }, [bgPhrase]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Auth0Provider
        domain="dev-hebscz28skxkl270.us.auth0.com"
        clientId="qbtfzMXSrmAvJMOX7AHLdk9n2xSjFgdN"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div className={`App ${bgColor}`}>
                  {/* Heading (search box, C or F) */}
                  {currentZone && (
                    <Heading
                      unit={unit}
                      setUnit={setUnit}
                      currentZone={currentZone}
                    />
                  )}
                  {/* Main weather */}
                  {keyLoc && (
                    <Main
                      dataKey={keyLoc}
                      setBgPhrase={setBgPhrase}
                      setCurrentZone={setCurrentZone}
                    />
                  )}

                  {/* Hourly weather forecast */}
                  {keyLoc && <HourlyForecast dataKey={keyLoc} />}

                  {/*5 day Forecast */}
                  {keyLoc && <Forecast dataKey={keyLoc} />}
                </div>
              }
            />
            <Route exact path="/auth" element={<Login />} />
          </Routes>
        </Router>
      </Auth0Provider>
    </ThemeProvider>
  );
}

export default App;

// React hooks and auth provider
import { useEffect, useState } from "react";
import { currentArea, currentLoc } from "./redux/slices/global/globalSlice";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//Components
import Forecast from "./components/Forecast";
import Heading from "./components/Heading";
import Main from "./components/Main";
import HourlyForecast from "./components/HourlyForecast";
//Style
import "./assets/style/style.scss";
//Bg
import { clear } from "./assets/img/icons/weatherIcons";

const REACT_IP_API_KEY = import.meta.env.VITE_IP_API_KEY;

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

    const lastLocation = JSON.parse(localStorage.getItem("lastLocation"));
    if (lastLocation) {
      dispatch(currentLoc(lastLocation.loc));
      dispatch(
        currentArea({ city: lastLocation.city, region: lastLocation.region })
      );
      setCurrentZone({
        city: lastLocation.city,
        region: lastLocation.region,
        loc: lastLocation.loc,
      });
    } else {
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
    }

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
      <div className={`App ${bgColor}`}>
        {/* Heading (search box, C or F) */}
        {currentZone && (
          <Heading unit={unit} setUnit={setUnit} currentZone={currentZone} />
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
    </ThemeProvider>
  );
}

export default App;

import { useEffect, useState } from "react";
//MUI
import { Box, Stack } from "@mui/material";
import ForecastCard from "./ForecastCard";
//Style
import "../assets/style/forecast.scss";
import ForecastDetails from "./ForecastDetails";
//Axios
import { weatherHourlyOptions } from "../utils/fetchData";
import axios from "axios";
import Footer from "./Footer";

export default function Forecast({ dataKey }) {
  const [forecast, setForecast] = useState(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchDataCityWeather = async (q) => {
      await axios
        .request(
          { ...weatherHourlyOptions, params: { q: q, days: 5 } },
          { cancelToken: source.token }
        )
        .then(function (response) {
          setForecast(response.data.forecast.forecastday.slice(0, 3));
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    fetchDataCityWeather(dataKey);

    return () => {
      source.cancel();
    };
  }, [dataKey]);
  return (
    <Box p="10px">
      <Stack
        direction="row"
        maxWidth="720px"
        margin="auto"
        gap="5px"
        justifyContent="space-between"
      >
        {forecast?.map((item, index) => (
          <ForecastCard
            i={index}
            key={index}
            data={item}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </Stack>
      {/* 3 days forecast selected details */}
      {forecast && <ForecastDetails data={forecast[selected]} />}
      {/* This is my footer added under the forecast section */}
      <Footer />
    </Box>
  );
}

const REACT_WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const weatherOptions = {
  method: "GET",
  url: "https://api.weatherapi.com/v1/current.json",
  headers: {
    key: REACT_WEATHER_API_KEY,
  },
};

export const weatherHourlyOptions = {
  method: "GET",
  url: "https://api.weatherapi.com/v1/forecast.json",
  headers: {
    key: REACT_WEATHER_API_KEY,
  },
};

export const searchOptions = {
  method: "GET",
  url: "https://api.weatherapi.com/v1/search.json",
  headers: {
    key: REACT_WEATHER_API_KEY,
  },
};

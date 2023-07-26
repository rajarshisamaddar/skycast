// Navigate hook and auth auth hook
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
//MUI
import { Stack, Box, Typography, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { toast } from "react-toastify";
//Style
import "../assets/style/heading.scss";
//React hooks
import { useEffect, useState } from "react";
//Icons
import { AiOutlineClose } from "react-icons/ai";
//Axios
import { searchOptions } from "../utils/fetchData";
import axios from "axios";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  settingsToggle,
  pinLocation,
  currentLoc,
  currentArea,
  filterpinLocation,
  unitToggle,
  themeToggle,
} from "../redux/slices/global/globalSlice";
import Settings from "./Settings";
import { MY_SERVER_URL } from "../API.ts";

export default function Heading({ currentZone }) {
  const SERVER_URL = MY_SERVER_URL;
  // Redux data
  const fav = useSelector((state) => state.global.favourites);
  const cLocation = useSelector((state) => state.global.selectedLoc);
  const cArea = useSelector((state) => state.global.selectedArea);
  const theme = useSelector((state) => state.global.theme);
  const dispatch = useDispatch();
  //Local state
  const [inputValue, setInputValue] = useState("");
  const [locations, setLocations] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);
  // const [loc, setLoc] = useState();

  const regionRender = selectedRegion
    ? `${selectedRegion.city}, ${selectedRegion.region}`
    : `${currentZone.city}, ${currentZone.region}`;

  const favSet = selectedRegion
    ? {
        city: selectedRegion.city,
        region: selectedRegion.region,
        loc: cLocation,
      }
    : {
        city: currentZone.city,
        region: currentZone.region,
        loc: currentZone.loc,
      };

  useEffect(() => {
    setSelectedRegion(null);
  }, [currentZone]);

  //handle change input value
  const handleChange = async (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      await axios
        .request({ ...searchOptions, params: { q: e.target.value } })
        .then(function (response) {
          setLocations(response.data);
          setIsModalOpen(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    setSelectedRegion({ city: cArea.city, region: cArea.region });
    let temp = false;
    fav.map((obj) => {
      if (obj.loc === favSet.loc) temp = true;
    });
    if (temp === true) setIsFav(true);
    else setIsFav(false);
  }, [cLocation, isFav, fav]);

  //handle select region
  const handleClick = (lat, lon, city, region) => {
    // setLoc(`${lat}, ${lon}`);
    dispatch(currentLoc(`${lat}, ${lon}`));
    dispatch(currentArea({ city: city, region: region }));
    setSelectedRegion({ city: city, region: region });
    setInputValue("");
    setIsModalOpen(false);
    setLocations(null);
  };

  // Redirecting to the auth page if not authenticated else create new user and data fetch

  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();

  if (isAuthenticated) {
    if (!isLoading) {
      const newUser = {
        favourites: [],
        unit: "C",
        theme: "light",
        id: user.email,
      };
      fetch(SERVER_URL, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      fetch(`${SERVER_URL}${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          data.favourites.map((obj) => {
            dispatch(pinLocation(obj));
          });
          dispatch(unitToggle(data.unit));
          dispatch(themeToggle(data.theme));
        });
    }
  }

  // handle favourites
  function handleFavourites() {
    let p = false;
    fav.map((obj) => {
      if (obj.city === favSet.city) {
        p = true;
      }
    });
    if (p !== true) {
      const myEmail = user.email;
      const temp = [...fav, favSet];
      dispatch(pinLocation(favSet));
      const newObj = {
        favourites: temp,
      };

      fetch(`${SERVER_URL}${myEmail}`, {
        method: "PATCH",
        body: JSON.stringify(newObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      setIsFav(true);

      const resolveAfter3Sec = new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      toast.promise(
        resolveAfter3Sec,
        {
          pending: "Adding to Your Favorites...",
          success: "Added to Favorites! 👍",
          error: "Addition Error! 🤯",
        },
        { theme: theme }
      );
    } else {
      const filteredFav = fav.filter((item) => item.loc !== cLocation);

      const myEmail = user.email;
      const newObj = {
        favourites: filteredFav,
      };

      fetch(`${SERVER_URL}${myEmail}`, {
        method: "PATCH",
        body: JSON.stringify(newObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      setTimeout(() => {
        dispatch(filterpinLocation(filteredFav));
        setIsFav(false);
      }, 3000);

      const resolveAfter3Sec = new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      toast.promise(
        resolveAfter3Sec,
        {
          pending: "Removing from Your Favorites...",
          success: "Removed from Favorites! 👍",
          error: "Removal Error! 🤯",
        },
        { theme: theme }
      );
    }
  }

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate("/auth");
      }
    }
  }, []);

  // const fetchUser = async () => {};

  return (
    <header>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        sx={{ maxWidth: "720px", margin: "auto" }}
        position="relative"
      >
        {/* Locations container */}
        <Stack
          className={`${
            isModalOpen && locations?.length > 0 && "open"
          } locations`}
        >
          <AiOutlineClose
            className="close_icon"
            onClick={() => setIsModalOpen(false)}
          />
          {locations?.length > 0 &&
            locations.map((item) => (
              <p
                key={item.id}
                onClick={() =>
                  handleClick(item.lat, item.lon, item.name, item.region)
                }
              >
                {item.name}, {item.region}, {item.country}
              </p>
            ))}
        </Stack>

        {/* Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#fff",
            borderRadius: "20px 5px 20px 5px",
            padding: "5px 15px",
            width: { xs: "100%", md: "auto" },
            marginBottom: { xs: "8px", md: "0" },
          }}
        >
          <input
            value={inputValue}
            onChange={handleChange}
            placeholder="Find your location..."
            //onKeyUp={handleSearch}
          />
          <SearchIcon fill="#ebebeb" sx={{ fill: "#bebebe" }} />
        </Box>
        <Typography
          fontFamily="'Quicksand', sans-serif"
          color="#ebebeb"
          display="inline"
          sx={{ marginLeft: { md: "auto" } }}
        >
          {regionRender}
        </Typography>

        <Box
          style={{
            color: "#ebebeb",
            marginLeft: "auto",
          }}
        >
          <Tooltip title="Open Settings">
            <SettingsIcon
              style={{
                marginRight: "10px",
              }}
              onClick={() => {
                dispatch(settingsToggle());
              }}
              cursor="pointer"
            />
          </Tooltip>

          {isFav && (
            <Tooltip title="Remove from Favorites">
              <BookmarkAddedIcon cursor="pointer" onClick={handleFavourites} />
            </Tooltip>
          )}
          {!isFav && (
            <Tooltip title="Add to Favorites">
              <BookmarkBorderIcon cursor="pointer" onClick={handleFavourites} />
            </Tooltip>
          )}
        </Box>
        <Settings />
      </Stack>
    </header>
  );
}

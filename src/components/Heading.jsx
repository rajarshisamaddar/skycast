//MUI
import { Stack, Box, Typography, Tooltip, useMediaQuery } from "@mui/material";
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
import { MdInstallDesktop, MdOutlineInstallMobile } from "react-icons/md";
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

export default function Heading({ currentZone }) {
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

  // useEffect(() => {
  //   setSelectedRegion(null);
  // }, [currentZone]);

  useEffect(() => {
    if (cLocation && cArea) {
      const lastLocation = {
        city: cArea.city,
        region: cArea.region,
        loc: cLocation,
      };
      localStorage.setItem("lastLocation", JSON.stringify(lastLocation));
    }
  }, [cLocation]);

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

  useEffect(() => {
    // Get the item from local storage
    const dataString = localStorage.getItem("favourites");
    if (dataString) {
      // Parse the string back into an object
      const dataObject = JSON.parse(dataString);
      // Get the favourites array from the object
      const favourites = dataObject ? dataObject.favourites : [];
      favourites.map((obj) => {
        dispatch(pinLocation(obj));
      });
    }
    const unitString = localStorage.getItem("unit");
    if (unitString) {
      dispatch(unitToggle(unitString));
    }

    const themeString = localStorage.getItem("theme");
    if (themeString) {
      dispatch(themeToggle(themeString));
    }
  }, []);

  // handle favourites
  function handleFavourites() {
    let p = false;
    fav.map((obj) => {
      if (obj.city === favSet.city) {
        p = true;
      }
    });
    if (p !== true) {
      const temp = [...fav, favSet];
      dispatch(pinLocation(favSet));
      const newObj = {
        favourites: temp,
      };

      const dataString = JSON.stringify(newObj);

      // Save the string to local storage
      localStorage.setItem("favourites", dataString);

      setIsFav(true);

      const resolveAfter3Sec = new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      toast.promise(
        resolveAfter3Sec,
        {
          pending: "Adding to Your Favorites...",
          success: "Added to Favorites in the Settings! 👍",
          error: "Addition Error! 🤯",
        },
        { theme: theme }
      );
    } else {
      const filteredFav = fav.filter((item) => item.loc !== cLocation);

      const newObj = {
        favourites: filteredFav,
      };

      // Convert the object into a string
      const dataString = JSON.stringify(newObj);

      // Update the item in local storage
      localStorage.setItem("myData", dataString);

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

  const isDesktop = useMediaQuery("(min-width:1024px)");
  const isMobile = useMediaQuery("(max-width:1024px)");

  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent Chrome from showing the mini-infobar
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
    });
  }, []);

  const handleClickPWA = () => {
    // Show the install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setDeferredPrompt(null);
    }
  };

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
          {isDesktop && (
            <Tooltip title="Install App">
              <div style={{ display: "inline-block" }}>
                <MdInstallDesktop
                  style={{
                    marginRight: "10px",
                  }}
                  cursor="pointer"
                  size={24}
                  onClick={handleClickPWA}
                />
              </div>
            </Tooltip>
          )}
          {isMobile && (
            <Tooltip title="Install App">
              <div style={{ display: "inline-block" }}>
                <MdOutlineInstallMobile
                  style={{
                    marginRight: "10px",
                  }}
                  cursor="pointer"
                  size={24}
                  onClick={handleClickPWA}
                />
              </div>
            </Tooltip>
          )}
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

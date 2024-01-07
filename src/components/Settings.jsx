import * as React from "react";
import {
  Typography,
  Box,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  currentArea,
  currentLoc,
  settingsToggle,
  unitToggle,
  themeToggle,
} from "../redux/slices/global/globalSlice";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.default",
  border: "none",
  width: "22rem",
  borderRadius: "8px",
  boxShadow: 24,
  p: 3.5,
};

export default function Settings() {
  const open = useSelector((state) => state.global.settingsOpen);
  const unit = useSelector((state) => state.global.unit);
  const theme = useSelector((state) => state.global.theme);
  const fav = useSelector((state) => state.global.favourites);
  const cArea = useSelector((state) => state.global.selectedArea);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(settingsToggle());
  };

  function handleUnit(e) {
    dispatch(unitToggle(e.target.value));

    localStorage.setItem("unit", e.target.value);

    toast.success("Unit Conversion Complete! 🔥", { theme: theme });
  }

  function handleTheme(e) {
    localStorage.setItem("theme", e.target.value);
    setTimeout(() => {
      dispatch(themeToggle(e.target.value));
    }, 3000);

    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );
    toast.promise(
      resolveAfter3Sec,
      {
        pending: "Updating your Theme...",
        success: "Theme Updated! 👌🌈",
        error: "Theme Updated Rejected! 🤯",
      },
      { theme: theme }
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
    >
      <Box sx={style} align="center">
        <Typography id="modal-modal-title" variant="h4" component="h2">
          SkyCast Settings
        </Typography>
        <FormControl sx={{ mt: 4 }} fullWidth>
          <InputLabel id="demo-multiple-name-label">
            Choose Temperature Unit 🌡️
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            input={<OutlinedInput label="Choose Temperature Unit 🌡️" />}
            value={unit}
            onChange={handleUnit}
          >
            <MenuItem value="C">Centigrade - °C</MenuItem>
            <MenuItem value="F">Fahrenheit - °F</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ mt: 3 }} fullWidth>
          <InputLabel id="demo-multiple-name-label">
            Select Preferred Theme 🎨
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            input={<OutlinedInput label="Select Preferred Theme 🎨" />}
            value={theme}
            onChange={handleTheme}
          >
            <MenuItem value="dark">Dark</MenuItem>
            <MenuItem value="light">Light</MenuItem>
          </Select>
        </FormControl>

        {fav.length > 0 && (
          <FormControl sx={{ mt: 3 }} fullWidth>
            <InputLabel id="demo-multiple-name-label">
              Pick a Favorite Location 📍
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              input={<OutlinedInput label="Pick a Favorite Location 📍" />}
              onChange={(e) => {
                fav.map((obj) => {
                  if (obj.city === e.target.value) {
                    dispatch(currentLoc(obj.loc));
                    const temp = {
                      city: obj.city,
                      region: obj.region,
                    };
                    dispatch(currentArea(temp));
                    toast.success("Favourite Location Selected! 📍", {
                      theme: theme,
                    });
                  }
                });
              }}
              value={cArea.city}
            >
              {fav.map((obj) => {
                return (
                  <MenuItem key={obj.loc} value={obj.city}>
                    {obj.city}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      </Box>
    </Modal>
  );
}

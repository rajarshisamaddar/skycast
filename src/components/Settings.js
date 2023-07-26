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
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import {
  currentArea,
  currentLoc,
  settingsToggle,
  unitToggle,
  themeToggle,
} from "../redux/slices/global/globalSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { MY_SERVER_URL } from "../API.ts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.default",
  border: "none",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function Settings() {
  const SERVER_URL = MY_SERVER_URL;
  const open = useSelector((state) => state.global.settingsOpen);
  const unit = useSelector((state) => state.global.unit);
  const theme = useSelector((state) => state.global.theme);
  const fav = useSelector((state) => state.global.favourites);
  const cArea = useSelector((state) => state.global.selectedArea);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(settingsToggle());
  };

  const { user } = useAuth0();

  function handleUnit(e) {
    const myEmail = user.email;
    dispatch(unitToggle(e.target.value));
    const newObj = {
      unit: e.target.value,
    };

    fetch(`${SERVER_URL}${myEmail}`, {
      method: "PATCH",
      body: JSON.stringify(newObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    toast.success("Unit Conversion Complete! 🔥", { theme: theme });
  }

  function handleTheme(e) {
    const myEmail = user.email;
    const newObj = {
      theme: e.target.value,
    };

    fetch(`${SERVER_URL}${myEmail}`, {
      method: "PATCH",
      body: JSON.stringify(newObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
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

  const { logout } = useAuth0();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
      >
        <Box sx={style} align="center">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            SkyCast Settings{" "}
            <Tooltip title="Sign out from SkyCast">
              <LogoutIcon
                cursor="pointer"
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
                sx={{ "&:hover": { color: "error.light" } }}
              />
            </Tooltip>
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
                  return <MenuItem value={obj.city}>{obj.city}</MenuItem>;
                })}
              </Select>
            </FormControl>
          )}
        </Box>
      </Modal>
    </div>
  );
}

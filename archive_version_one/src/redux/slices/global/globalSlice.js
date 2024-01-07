import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settingsOpen: false,
  unit: "C",
  favourites: [],
  selectedLoc: "",
  selectedArea: "",
  email: "",
  theme: "light",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    settingsToggle: (state) => {
      state.settingsOpen = !state.settingsOpen;
    },
    unitToggle: (state, action) => {
      state.unit = action.payload;
    },
    themeToggle: (state, action) => {
      state.theme = action.payload;
    },
    pinLocation: (state, action) => {
      let check = false;
      state.favourites.map((obj) => {
        if (obj.city === action.payload.city) {
          check = true;
        }
      });
      if (check === false)
        state.favourites = [...state.favourites, action.payload];

      // if (check === true)
      //   state.favourites = { ...state, favourites: action.payload };

      // else return { ...state, favourites: action.payload };
    },
    filterpinLocation: (state, action) => {
      // state.favourites = action.payload;

      return { ...state, favourites: action.payload };
    },
    currentLoc: (state, action) => {
      state.selectedLoc = action.payload;
    },
    currentArea: (state, action) => {
      state.selectedArea = action.payload;
    },
    createUser: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const {
  settingsToggle,
  unitToggle,
  themeToggle,
  pinLocation,
  currentLoc,
  createUser,
  currentArea,
  filterpinLocation,
} = globalSlice.actions;

export default globalSlice.reducer;

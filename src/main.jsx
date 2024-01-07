import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//MUI THEME PROVIDER
import { ThemeProvider } from "@mui/material";
import { theme } from "./utils/theme";
// My REDUX STORE AND PROVIDER
import { store } from "./redux/Store";
import { Provider } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  </>
);

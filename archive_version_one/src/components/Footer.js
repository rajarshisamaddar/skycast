import React from "react";
import { Stack } from "@mui/material";

function Footer() {
  return (
    <footer className="footer">
      <Stack>
        <p>
          Explore the Skies with SkyCast ✨ | © Rajarshi Samaddar{" "}
          {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </Stack>
    </footer>
  );
}

export default Footer;

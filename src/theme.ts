import { extendTheme } from "@chakra-ui/react";

const colors = {
  primary: "#2FAC85",
  primaryDark: "#24a27b",
  sidebar: "#F0F3F4",
  trueGray: "#566164",
  "trueGray.200": "#6E777A",
};

const theme = extendTheme({
  colors,
});

export default theme;

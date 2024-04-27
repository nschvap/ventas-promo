import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./firebase.ts";

// CSS / SCRIPTS
import "./globals.css";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#f3faf9",
      100: "#d7f0ed",
      200: "#9dd9d2",
      300: "#7fc9c3",
      400: "#55aca8",
      500: "#3b918f",
      600: "#2d7473",
      700: "#275e5d",
      800: "#234c4c",
      900: "#214040",
      950: "#0e2425",
    },
    secondary: {
      50: "#fff9ed",
      100: "#fff1d4",
      200: "#ffdfa8",
      300: "#ffc770",
      400: "#ffa337",
      500: "#ff8811",
      600: "#f06b06",
      700: "#c75007",
      800: "#9e3f0e",
      900: "#7f360f",
      950: "#451905",
    },
    light: {
      50: "#fff8f0",
      100: "#ffecd5",
      200: "#fed5aa",
      300: "#fdb774",
      400: "#fb8e3c",
      500: "#f96e16",
      600: "#ea530c",
      700: "#c23d0c",
      800: "#9a3112",
      900: "#7c2b12",
      950: "#431307",
    },
    dark: {
      50: "#fbfcf1",
      100: "#f2f7d0",
      200: "#e4efa0",
      300: "#cbdf69",
      400: "#abc73a",
      500: "#8dab21",
      600: "#6f8a17",
      700: "#596e17",
      800: "#475817",
      900: "#3c4918",
      950: "#090c02",
    },

    info: {
      50: "#fdf9ed",
      100: "#f8eecd",
      200: "#f3dfa2",
      300: "#eac35f",
      400: "#e5ad3a",
      500: "#dd8f23",
      600: "#c46d1b",
      700: "#a34f1a",
      800: "#853e1b",
      900: "#6d341a",
      950: "#3e1a0a",
    },

    danger: {
      50: "#fff1f2",
      100: "#fee5e7",
      200: "#fdced3",
      300: "#faa7af",
      400: "#f77585",
      500: "#ef445f",
      600: "#d62246",
      700: "#b9173c",
      800: "#9b1638",
      900: "#851636",
      950: "#4a0719",
    },
    success: {
      50: "#f0ffee",
      100: "#daffd8",
      200: "#a6ffa1",
      300: "#7efd78",
      400: "#3df236",
      500: "#13db0c",
      600: "#09b603",
      700: "#0b8e07",
      800: "#0e700b",
      900: "#0d5b0c",
      950: "#003300",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  breakpoints: {
    base: "",
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
});

export default customTheme;

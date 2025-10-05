import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  fontFamily: {
    body: "IRANSans, system-ui, sans-serif",
    display: "IRANSans, system-ui, sans-serif",
    code: "monospace",
  },
  colorSchemes: {
    light: {
      palette: {
        brand: {
          50: "#4428d2",// 🎨 رنگ برند شما
          100: "#ffffff",
          500: "#6368C4", 
        },
        
      },
    },
    dark: {
      palette: {
        brand: {
          50: "#dfe3ff",
          100: "#b8bcff",
          500: "#6368C4",
        },
      },
    },
  },
});

export default theme;

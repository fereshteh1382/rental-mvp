import { createTheme } from "@mui/material/styles";
import { typography } from "./typography";
import { palette } from "./palette";
import { components } from "./components";

export const FUMtheme = createTheme({
  direction: "rtl",
  typography,
  palette,
  components,
});

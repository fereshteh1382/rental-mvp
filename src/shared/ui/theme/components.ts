import type{ Components } from "@mui/material/styles";

export const components: Components = {
  MuiTextField: {
    defaultProps: {
      size: "small",
      variant: "outlined",
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: "0.85rem",
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        fontSize: "0.9rem",
        padding: "8.5px 14px",
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        fontSize: "0.75rem",
      },
    },
  },
  
  
};

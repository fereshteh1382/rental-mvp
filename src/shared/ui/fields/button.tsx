import * as React from "react";
import { Box, Button, FormHelperText } from "@mui/material";

type FUMButtonProps = {
  label: string;
  error?: boolean;
  helperText?: string;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
} & React.ComponentProps<typeof Button>;

export function FUMButton({
  label,
  error = false,
  helperText,
  variant = "contained",
  color = "primary",
  fullWidth = true,
  size = "small",
  onClick,
  ...props
}: FUMButtonProps) {
  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Button
        variant={variant}
        color={color}
        fullWidth={fullWidth}
        size={size}
        onClick={onClick}
        {...props}
      >
        {label}
      </Button>
      {helperText && (
        <FormHelperText error={error}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
}

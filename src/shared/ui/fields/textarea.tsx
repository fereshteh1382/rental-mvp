import TextField from "@mui/material/TextField";
import type { TextAreaFieldSchema } from "../form-builder/types";

export function FUMTextarea({
  value,
  onChange,
  error,
  helperText,
  field,
}: {
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  helperText?: string;
  field: TextAreaFieldSchema;
}) {
  const { label, placeholder, required, description, ui } = field;

  return (
    <TextField
      fullWidth
      multiline
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      label={required ? `${label} *` : label}
      placeholder={placeholder}
      error={!!error}
      helperText={helperText || description || " "}
      size="small"
      variant="outlined"
      minRows={ui?.autoSize ? ui?.minRows ?? 3 : ui?.rows ?? 3}
      maxRows={ui?.autoSize ? ui?.maxRows : undefined}
      sx={{
        "& textarea": {
          resize: "vertical", 
        },
        overflowY: 'auto'
      }}
     
      slotProps={{
        inputLabel: {
          shrink: true,
          sx: {
            transformOrigin: "top right",
            left: "auto",
            right: 30,
            textAlign: "right",
          },
        },
      }}
    />
  );
}

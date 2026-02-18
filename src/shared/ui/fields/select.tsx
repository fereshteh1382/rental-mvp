import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText"

interface FUMSelectProps {
  value: any;
  onChange: (value: any) => void;
  options?: { label: string; value: any }[];
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  multiple?: boolean;
}
export const FUMSelect: React.FC<FUMSelectProps> = ({
  value,
  onChange,
  options = [],
  label,
  placeholder,
  error = false,
  helperText = " ",
  multiple = false,
}) => {
  const normalizedValue = multiple
    ? Array.isArray(value) ? value : []
    : value ?? "";

    const handleChange = (event: SelectChangeEvent<any>) => {
      const val = event.target.value;
      onChange(
        multiple
          ? typeof val === "string" ? val.split(",") : val
          : val
      );
    };

  return (
    <FormControl fullWidth error={error} size="small">
      {label && (
        <InputLabel
          shrink
          sx={{
            transformOrigin: "top right",
            left: "auto",
            right: 30,
            textAlign: "right",
          }}
        >
          
          {label}
        </InputLabel>
      )}

<Select
  multiple={multiple}
  displayEmpty
  value={normalizedValue}
  onChange={handleChange}
  input={
    <OutlinedInput
      label={label}
      notched
    />
  }
  renderValue={(selected) => {
    if (!multiple && !selected) {
      return <span style={{ opacity: 0.5 }}>{placeholder}</span>;
    }

    if (!multiple) {
      return options.find(o => o.value === selected)?.label || "";
    }

    return (selected as any[])
      .map(v => options.find(o => o.value === v)?.label)
      .join("، ");
  }}
>
  {!multiple && placeholder && (
    <MenuItem value="" disabled>
      <em>{placeholder}</em>
    </MenuItem>
  )}

  {options.map(opt => (
    <MenuItem key={opt.value} value={opt.value}>
      {multiple && (
        <Checkbox checked={normalizedValue.includes(opt.value)} />
      )}
      <ListItemText primary={opt.label} />
    </MenuItem>
  ))}
</Select>

      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

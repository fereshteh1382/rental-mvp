
import { FormControl, FormLabel, FormHelperText, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import type { SelectFieldSchema } from "../form-builder/types";

type FUMRadioGroupProps = {
  value?: any;
  onChange?: (value: any) => void;
  error?: boolean;
  helperText?: string;
  field: SelectFieldSchema; 
};

export function FUMRadioGroup({ value, onChange, error, helperText, field }: FUMRadioGroupProps) {
  const { label, required, description, options } = field;

  return (
    <FormControl component="fieldset" error={!!error}>
      {label && (
        <FormLabel component="legend">
          {required ? `${label} *` : label}
        </FormLabel>
      )}

      <RadioGroup
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        row={false} // اگر بخواهی افقی باشه true
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio />}
            label={opt.label}
          />
        ))}
      </RadioGroup>

      <FormHelperText>{helperText || description || " "}</FormHelperText>
    </FormControl>
  );
}

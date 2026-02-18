import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";
import moment from "moment-jalaali";
import type { DateFieldSchema } from "../form-builder/types";

moment.loadPersian({ dialect: "persian-modern" });

type FUMDatePickerSolarProps = {
    value?: string | null; // ISO
    onChange?: (date: string | null) => void;
    error?: boolean;
    helperText?: string;
    field: DateFieldSchema;
  };
  
  export function FUMDatePickerSolar({
    value,
    onChange,
    error,
    helperText,
    field,
  }: FUMDatePickerSolarProps) {
    const { label, required, placeholder, description, min, max } = field;
  
    return (
      <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
        <DatePicker
          value={value ? moment(value) : null}
          onChange={(newValue) =>
            onChange?.(newValue ? newValue.toISOString() : null)
          }
          label={required ? `${label} *` : label}
          minDate={min ? moment(min) : undefined}
          maxDate={max ? moment(max) : undefined}
         /* slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              error: !!error,
              helperText: helperText || description || " ",
              placeholder,
              InputLabelProps: { shrink: true },
              sx: {
                direction: "rtl",
                textAlign: "right",
              },
            },
          }}*/
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              error: !!error,
              helperText: helperText || description || " ",
              placeholder,
              InputLabelProps: {
                shrink: true, // label روی border مثل TextField
                sx: {
                  textAlign: "right", // label راست چین
                  right: 30,
                  left: "auto",
                  transformOrigin: "top right",
                },
              },
              InputProps: {
                endAdornment: undefined, // حذف آیکن پیشفرض سمت راست
                startAdornment: undefined, // اگر خواستی آیکن خودت سمت چپ
              },
              sx: {
                direction: "rtl", // متن داخل input راست چین
                "& .MuiInputAdornment-root": {
                  order: -1, // آیکن سمت چپ
                },
                textAlign: "right",
              },
            },
          }}
        />
      </LocalizationProvider>
    );
  }
  
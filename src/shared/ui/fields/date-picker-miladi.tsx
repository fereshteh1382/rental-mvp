
import dayjs, { type Dayjs } from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { DateFieldSchema } from "../form-builder/types";

type FUMDatePickerMiladiProps = {
  value?: Dayjs | null;
  onChange?: (date: Dayjs | null) => void;
  error?: boolean;
  helperText?: string;
  field: DateFieldSchema;
};

export function FUMDatePickerMiladi({
  value,
  onChange,
  error,
  helperText,
  field,
}: FUMDatePickerMiladiProps) {
  const { label, required, description, placeholder, minDate, maxDate } = field;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value ?? null}
        onChange={onChange}
        label={required ? `${label} *` : label}
        minDate={minDate}
        maxDate={maxDate}
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

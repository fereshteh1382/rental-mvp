import type { AlertFieldSchema } from "../form-builder/types";
import { Alert } from "@mui/material";

type FUMAlertProps = {
  field: AlertFieldSchema;
};

export function FUMAlert({ field }: FUMAlertProps) {
    //console.log(field.severity );
  return (
    <Alert
      severity={field.severity ?? "info"}
      variant={field.variant ?? "standard"}
      color={field.color ?? field.severity ?? "info"}
      sx={{ mt: 1, mb: 1 }}
    >
      {field.message}
    </Alert>
  );
}

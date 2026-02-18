import * as React from "react"
import TextField from "@mui/material/TextField"

type FUMInputProps = {
  error?: boolean
  helperText?: string
  label?: string
} & React.ComponentProps<typeof TextField>

function Input({ error, helperText, label, ...props }: FUMInputProps) {
  return (
    <TextField
    {...props}
      fullWidth
      size="small"
      variant="outlined"
      label={label}  
      error={!!error}
      helperText={helperText}
      slotProps={{
       
        inputLabel: {
          shrink: true,
          sx: {
            transformOrigin: "top right", 
            left: "auto",
            right: 30,
            textAlign: "right",
          }
        }
      }}
      
      
      
      
    />
  )
}

export { Input }
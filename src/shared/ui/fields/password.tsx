import * as React from "react"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

type FUMPasswordProps = {
  error?: boolean
  helperText?: string
  label?: string
} & React.ComponentProps<typeof TextField>

function Password({ error, helperText, label, ...props }: FUMPasswordProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(s => !s)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      label={label}
      error={!!error}
      helperText={helperText}
      variant="outlined"
      fullWidth
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
      
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              onMouseUp={handleMouseUpPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
}

export { Password }

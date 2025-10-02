import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssVarsProvider } from "@mui/joy/styles";
import theme from "./theme"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <CssVarsProvider theme={theme}>
      <App />
    </CssVarsProvider>
  </StrictMode>,

)

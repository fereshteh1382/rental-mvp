import type { ReactNode } from "react";
import { CssBaseline, Container } from "@mui/joy";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CssBaseline />
     <Header />
      
      <Container sx={{ my: 4 }}>{children}</Container>
      <Footer />
    </>
  );
}

import { useState } from "react";
import { Grid, Sheet, Typography, Button, Input, IconButton, Box } from "@mui/joy";
import { useUiStore } from "../store/uiStore";
import { MapSelector } from "./MapSelector";
import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";


export function Header() {
  const openSignup = useUiStore((state) => state.openSignup);
  const [mapOpen, setMapOpen] = useState(false);
  const [city, setCity] = useState<string>("");

  return (
    <Sheet
      variant="outlined"
      sx={{
        borderBottom: "1px solid",
        borderColor: "neutral.outlinedBorder",
       
        top: 0,
        zIndex: 1000,
      }}
    >
      <Grid container>
        {/* سمت چپ: متن یا محتوا */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            order: { xs: 2, md: 1 }, // در موبایل پایین باشه، در دسکتاپ چپ
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            px: 3,
            py: 2,
            bgcolor: "#e1e1e1"

          }}
        >
          <Typography level="h4" sx={{ fontWeight: "bold" }}>
            دسته بندی ها
          </Typography>
        </Grid>

        {/* سمت راست: منو و دکمه */}
        <Grid
          item
          xs={12}
          md={9}
          sx={{
            order: { xs: 1, md: 2 }, // در موبایل بالا باشه، در دسکتاپ راست

            px: 2,
            py: 3,
            bgcolor: "brand.50", // رنگ بنفش
            color: "#fff",
            borderBottomLeftRadius: 24,
            position: "relative",
            
          }}
        >
          <Grid
            container

            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "center", md: "flex-start" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >


            <Grid item
              sx={{
                display: "flex",
                gap: 2,
                

              }}>
              <Button variant="solid" color="primary" onClick={() => setMapOpen(true)}>
                {city ? city : "شهر"}
              </Button>
              <Button variant="solid" color="primary" onClick={openSignup}>
                ثبت نام / ورود
              </Button>
              <Link
              
              to={`/items/`}
              className=""
            >لیست وسایل            
            </Link>
            <Link
              
              to={`/dashboard/`}
              className=""
            >پنل کاربری          
               </Link>
              <MapSelector
                open={mapOpen}
                onClose={() => setMapOpen(false)}
                onSelectCity={(selectedCity) => setCity(selectedCity)}
              />
            </Grid>
            {/*  لوگو */}
            <Grid item>
              <Typography level="h5" sx={{ fontWeight: "bold" }}>
                لوگو
              </Typography>
            </Grid>

          </Grid>
          <Grid
            container
            direction="column"
            sx={{ mt: 4, alignItems: "center", color: "#fff" }} // فاصله از بالا
          >
            <Typography level="h1" sx={{ fontWeight: "bold", mb: 2, color: "#fff" }}>
              عنوان اصلی اینجا
            </Typography>
            <Typography sx={{ color: "#f2f2f2" }}>
              این توضیحات زیر عنوان قرار می‌گیرد و می‌تواند چند خط باشد تا مفهوم بیشتری ارائه دهد.
            </Typography>
            {/* تصویر پایین سمت چپ */}

            {/* باکس جستجو */}
            <Grid
              container
              sx={{
                mt: 3,
                width: "100%",
                maxWidth: 600,
                bgcolor: "#fff",
                borderRadius: "md",
                overflow: "hidden",
              }}
            >
              <Input
                placeholder="چی می‌خوای جستجو کنی؟"
                sx={{
                  flex: 1,
                  "--Input-focusedThickness": "1px",
                  border: "none",
                  "& input": { px: 2 },
                }}
              />
              <IconButton
                color="primary"
                variant="solid"
                sx={{
                  borderRadius: 0,
                  px: 3,
                }}
              >

              </IconButton>
            </Grid>
          </Grid>
          {/* تصویر پایین سمت چپ */}
          <Box
      component="img"
      src="/img/hero.svg"
      alt="تصویر"
      sx={{
       // position: "absolute",
        bottom: 0, // فاصله از پایین
        left: 0,   // فاصله از چپ
       
        width: 300,
        height: "auto",
        objectFit: "contain",
        objectPosition: "left bottom",
        opacity: 0.8,
        zIndex: 0,
      }}
    />
        </Grid>

      </Grid>
    </Sheet>
  );

}

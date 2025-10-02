import { Grid, Sheet, Typography, Button, Link } from "@mui/joy";

export function Header() {
  return (
    <Sheet
      variant="outlined"
      sx={{
        borderBottom: "1px solid",
        borderColor: "neutral.outlinedBorder",
        position: "sticky",
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
           
            px: 3,
            py: 2,
            bgcolor: "brand.50", // رنگ بنفش
            color: "#fff",
            borderBottomLeftRadius: 24,
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
              <Button variant="solid" color="primary">
                شهر
              </Button>
              <Button variant="solid" color="primary">
              ثبت نام / ورود
              </Button>
              
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
            sx={{ mt: 4 , alignItems:"center",color:"#fff"}} // فاصله از بالا
          >
            <Typography level="h1" sx={{ fontWeight: "bold", mb: 2 ,color:"#fff"}}>
              عنوان اصلی اینجا
            </Typography>
            <Typography sx={{ color:"#f2f2f2"}}>
              این توضیحات زیر عنوان قرار می‌گیرد و می‌تواند چند خط باشد تا مفهوم بیشتری ارائه دهد.
            </Typography>
          </Grid>
        </Grid>

      </Grid>
    </Sheet>
  );
}

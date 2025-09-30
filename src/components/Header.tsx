import { Link } from "react-router-dom";
import { Sheet, Typography, Button, Box } from "@mui/joy";

export function Header() {
  return (
    <Sheet
      variant="solid"
      color="primary"
      sx={{
        px: 2,
        py: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* لوگو / نام سایت */}
      <Typography
        level="h4"
        component={Link}
        to="/"
        sx={{ textDecoration: "none", color: "white" }}
      >
        اجاره‌مارکت
      </Typography>

      {/* منوی ناوبری */}
      <Box>
        <Button
          component={Link}
          to="/"
          variant="plain"
          sx={{ color: "white", mx: 1 }}
        >
          خانه
        </Button>
        <Button
          component={Link}
          to="/items"
          variant="plain"
          sx={{ color: "white", mx: 1 }}
        >
          وسایل
        </Button>
        <Button
          component={Link}
          to="/dashboard"
          variant="plain"
          sx={{ color: "white", mx: 1 }}
        >
          داشبورد
        </Button>
      </Box>
    </Sheet>
  );
}

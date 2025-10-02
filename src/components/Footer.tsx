import { Box, Typography, Link, Divider } from "@mui/joy";

export function Footer() {
  return (
    <Box component="footer" sx={{ mt: 6, py: 4, px: 2, bgcolor: "brand.50",color:"brand.100" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          gap: 4,
        }}
      >
        {/* ستون اول */}
        <Box>
          <Typography level="title-lg" sx={{ mb: 2 }}>
            RentHub
          </Typography>
          <Typography level="body-sm">
            اجاره آسان وسایل اطراف شما 🚀
          </Typography>
        </Box>

        {/* ستون دوم */}
        <Box>
          <Typography level="title-sm" sx={{ mb: 1 }}>
            Links
          </Typography>
          <Link href="/about" underline="none" sx={{ display: "block", mb: 1 }}>
            About Us
          </Link>
          <Link href="/help" underline="none" sx={{ display: "block", mb: 1 }}>
            Help Center
          </Link>
          <Link href="/terms" underline="none" sx={{ display: "block", mb: 1 }}>
            Terms & Conditions
          </Link>
        </Box>

        {/* ستون سوم */}
        <Box>
          <Typography level="title-sm" sx={{ mb: 1 }}>
            Contact
          </Typography>
          <Typography level="body-sm">Email: support@renthub.com</Typography>
          <Typography level="body-sm">Phone: +98 21 1234 5678</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />
      <Typography level="body-xs" textAlign="center">
        © {new Date().getFullYear()} RentHub. All rights reserved.
      </Typography>
    </Box>
  );
}

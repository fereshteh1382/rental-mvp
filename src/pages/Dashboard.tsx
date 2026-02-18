// src/pages/Dashboard.tsx
import React, { useState } from "react";
import { Grid, Sheet, Typography, Button, Box, Stack } from "@mui/joy";
import { FiPackage, FiList, FiLogOut } from "react-icons/fi";
import MyItems from "./MyItems";
import MyRequests from "./MyRequests";
import MyRequests2 from "./MyRequests2";
import AddItem from "./AddItem";

type Page = "myItems" | "myRequests" | "addItem" | "editItem" | "myRequests2";

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>("myItems");
  const [editItemId, setEditItemId] = useState<number | null>(null);

  return (
    <Grid container sx={{ height: "100vh" }} dir="rtl">
      {/* ستون راست */}
      <Grid xs={3}>
        <Sheet
          variant="outlined"
          sx={{
            height: "100%",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography level="h6" sx={{ textAlign: "center", mb: 2 }}>
            پنل کاربری
          </Typography>

          <Stack spacing={1}>
            <Button
              variant={currentPage === "myItems" ? "solid" : "outlined"}
              color="primary"
              startDecorator={<FiPackage />}
              onClick={() => setCurrentPage("myItems")}
            >
              وسایل من
            </Button>

            <Button
              variant={currentPage === "myRequests" ? "solid" : "outlined"}
              color="success"
              startDecorator={<FiList />}
              onClick={() => setCurrentPage("myRequests")}
            >
              درخواست‌های من
            </Button>

            <Button
              variant={currentPage === "myRequests2" ? "solid" : "outlined"}
              color="success"
              startDecorator={<FiList />}
              onClick={() => setCurrentPage("myRequests2")}
            >
              2درخواست‌های من
            </Button>
            <Button
              variant="outlined"
              color="danger"
              startDecorator={<FiLogOut />}
              onClick={() => alert("در حال خروج...")}
            >
              خروج
            </Button>
          </Stack>
        </Sheet>
      </Grid>

      {/* محتوای اصلی */}
      <Grid xs={9}>
        <Box sx={{ p: 3, height: "100%", overflow: "auto", bgcolor: "#f9f9f9" }}>

          {currentPage === "myItems" && (
            <MyItems
              onAddItem={() => setCurrentPage("addItem")}
              onEditItem={(id) => {
                setEditItemId(id);
                setCurrentPage("editItem");
              }}
            />
          )}

          {currentPage === "myRequests" && <MyRequests />}
          {currentPage === "myRequests2" && <MyRequests2 />}
          {currentPage === "addItem" && (
            <AddItem
              mode="add"
              onBack={() => setCurrentPage("myItems")}
            />
          )}

          {currentPage === "editItem" && editItemId !== null && (
            <AddItem
              mode="edit"
              itemId={editItemId}
              onBack={() => setCurrentPage("myItems")}
            />
          )}


         
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

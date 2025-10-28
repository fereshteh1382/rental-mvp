// src/pages/MyItems.tsx
import React, { useState } from "react";
import { Sheet, Typography, Button, Stack, Box } from "@mui/joy";
import { mockItems } from "../mockData";
import type { Item } from "../types";

const MyItems: React.FC = () => {
  const [items, setItems] = useState<Item[]>(mockItems);

  const handleDelete = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleEdit = (item: Item) => {
    alert("ویرایش وسیله: " + item.title);
  };

  return (
    <Box dir="rtl">
      <Typography level="h5" sx={{ mb: 2 }}>
        وسایل من
      </Typography>

      <Stack spacing={2}>
        {items.map(item => (
          <Sheet
            key={item.id}
            variant="outlined"
            sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}
          >
            <Typography level="h6">{item.title}</Typography>
            <Typography>{item.description}</Typography>
            <Typography fontWeight="lg">{item.price} تومان</Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Button color="primary" variant="solid" onClick={() => handleEdit(item)}>
                ویرایش
              </Button>
              <Button color="danger" variant="solid" onClick={() => handleDelete(item.id)}>
                حذف
              </Button>
            </Box>
          </Sheet>
        ))}
      </Stack>
    </Box>
  );
};

export default MyItems;

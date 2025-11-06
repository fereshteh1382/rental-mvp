// src/pages/MyItems.tsx
import React, { useState } from "react";
import { Sheet, Typography, Button, Stack, Box } from "@mui/joy";
import { mockItems } from "../mockData";
import type { Item } from "../types";


interface MyItemsProps {
  onAddItem: () => void;
  onEditItem: (id: number) => void;
} 

const getStoredItems = () => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : mockItems;
  };
const MyItems:React.FC<MyItemsProps> = ({ onAddItem,onEditItem }) => {

  const [items, setItems] = useState<Item[]>(getStoredItems);

  const handleDelete = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };
 
  
  return (
    <Box dir="rtl">
      <Typography level="h5" sx={{ mb: 2 }}>
        وسایل من
      </Typography>
      <Button
          color="success"
          variant="solid"
          onClick={onAddItem}
          sx={{
            borderRadius: "md",
            px: 3,
            py: 1,
            mb:4,
            fontWeight: "bold",
          }}
        >
          + افزودن وسیله جدید
        </Button>
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
              <Button color="primary" variant="solid" onClick={() => onEditItem(item.id)}>
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

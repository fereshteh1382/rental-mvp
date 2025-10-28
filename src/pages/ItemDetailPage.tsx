// src/pages/ItemDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sheet, Typography, Button, Stack, Input, Box } from "@mui/joy";

interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const mockItems: Item[] = [
  { id: "1", title: "دریل برقی", description: "دریل برقی حرفه‌ای با قدرت بالا", price: 200000, imageUrl: "/img/items.jpeg", category: "tools" },
  { id: "2", title: "میز مطالعه", description: "میز چوبی زیبا و مقاوم", price: 500000, imageUrl: "/img/items.jpeg", category: "furniture" },
  { id: "3", title: "هدفون بلوتوث", description: "هدفون با کیفیت عالی", price: 300000, imageUrl: "/img/items.jpeg", category: "electronics" },
];

const ItemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const foundItem = mockItems.find((i) => i.id === id);
    setItem(foundItem || null);
    setLoading(false);
  }, [id]);

  const handleRequest = () => {
    if (!startDate || !endDate) {
      alert("لطفاً تاریخ شروع و پایان را وارد کنید");
      return;
    }
    console.log("درخواست اجاره:", { itemId: id, startDate, endDate });
    setRequestSent(true);
  };

  if (loading) return <Typography>در حال بارگذاری...</Typography>;
  if (!item) return <Typography>وسیله‌ای پیدا نشد.</Typography>;

  return (
    <Box dir="rtl" maxWidth={600} mx="auto" p={3}>
      <Sheet variant="outlined" sx={{ p: 3, borderRadius: 2, boxShadow: "sm", display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography level="h4" fontWeight="bold">{item.title}</Typography>
        <img src={item.imageUrl} alt={item.title} style={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 8 }} />

        <Typography><strong>دسته:</strong> {item.category}</Typography>
        <Typography><strong>قیمت اجاره:</strong> {item.price} تومان</Typography>
        <Typography>{item.description}</Typography>

        <Stack spacing={2} mt={2}>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="تاریخ شروع اجاره"
            variant="outlined"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="تاریخ پایان اجاره"
            variant="outlined"
          />
        </Stack>

        <Button
          variant="solid"
          color={requestSent ? "primary" : "success"}
          onClick={handleRequest}
          disabled={requestSent}
          sx={{ mt: 2 }}
        >
          {requestSent ? "درخواست ارسال شد" : "درخواست اجاره"}
        </Button>
      </Sheet>
    </Box>
  );
};

export default ItemDetailsPage;

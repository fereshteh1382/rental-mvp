// src/pages/ItemDetailsPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sheet, Typography, Button, Stack, Input, Box } from "@mui/joy";
import { mockItems } from "../mockData";
import type { Item } from "../types";

const ItemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // داده‌ها را از localStorage یا mockData بگیر
    const savedItems = localStorage.getItem("items");
    const allItems: Item[] = savedItems ? JSON.parse(savedItems) : mockItems;
    const foundItem = allItems.find((i) => i.id.toString() === id);
    setItem(foundItem || null);
    setLoading(false);

    if (foundItem) {
      if (Array.isArray(foundItem.images) && foundItem.images.length > 0) {
        setMainImage(foundItem.images[0]);
      } else if (typeof foundItem.images === "string") {
        setMainImage(foundItem.images);
      }
    }
  }, [id]);

  const handleRequest = () => {
    if (!startDate || !endDate) {
      alert("لطفاً تاریخ شروع و پایان اجاره را وارد کنید");
      return;
    }

    // می‌تونی این داده‌ها رو به API بفرستی یا در localStorage ذخیره کنی
    console.log("درخواست اجاره:", { itemId: id, startDate, endDate });
    setRequestSent(true);
  };

  if (loading) return <Typography>در حال بارگذاری...</Typography>;
  if (!item) return <Typography>وسیله‌ای پیدا نشد.</Typography>;

  return (
    <Box dir="rtl" maxWidth={700} mx="auto" p={3}>
      <Sheet
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: "sm",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "#fff",
        }}
      >
        {/* دکمه بازگشت */}
        <Button
          size="sm"
          color="neutral"
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ alignSelf: "flex-start" }}
        >
          بازگشت
        </Button>

        {/* عنوان */}
        <Typography level="h4" fontWeight="bold">
          {item.title}
        </Typography>

        {/* تصویر اصلی */}
        <img
          src={mainImage}
          alt={item.title}
          style={{
            width: "100%",
            height: 300,
            objectFit: "cover",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />

        {/* تصاویر کوچک */}
        {Array.isArray(item.images) && item.images.length > 1 && (
          <div className="flex gap-2 justify-center mt-2 flex-wrap">
            {item.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`تصویر ${index + 1}`}
                onClick={() => setMainImage(img)}
                style={{
                  width: 70,
                  height: 70,
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: 8,
                  border:
                    img === mainImage
                      ? "2px solid #1976d2"
                      : "1px solid #ccc",
                }}
              />
            ))}
          </div>
        )}

        {/* توضیحات */}
        <Typography>
          <strong>دسته:</strong> {item.category}
        </Typography>
        <Typography>
          <strong>قیمت اجاره:</strong>{" "}
          {item.price.toLocaleString()} تومان
        </Typography>
        <Typography>{item.description}</Typography>

        {/* تاریخ‌ها */}
        <Stack spacing={2} mt={2}>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="تاریخ شروع اجاره"
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="تاریخ پایان اجاره"
          />
        </Stack>

        {/* دکمه ارسال درخواست */}
        <Button
          variant="solid"
          color={requestSent ? "primary" : "success"}
          onClick={handleRequest}
          disabled={requestSent}
          sx={{ mt: 2 }}
        >
          {requestSent ? "درخواست ارسال شد ✅" : "درخواست اجاره"}
        </Button>
      </Sheet>
    </Box>
  );
};

export default ItemDetailsPage;

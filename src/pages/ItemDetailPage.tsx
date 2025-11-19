import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sheet, Typography, Button, Stack, Input, Box, IconButton } from "@mui/joy";
import { mockItems } from "../mockData";
import type { Item } from "../types";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ItemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // مودال
  const [openModal, setOpenModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    const allItems: Item[] = savedItems ? JSON.parse(savedItems) : mockItems;
    const foundItem = allItems.find((i) => i.id.toString() === id);
    setItem(foundItem || null);
    setLoading(false);

    if (foundItem && Array.isArray(foundItem.images) && foundItem.images.length > 0) {
      setMainImage(foundItem.images[0]);
    }
  }, [id]);

  const handleRequest = () => {
    if (!startDate || !endDate) {
      alert("لطفاً تاریخ شروع و پایان اجاره را وارد کنید");
      return;
    }
    console.log("درخواست اجاره:", { itemId: id, startDate, endDate });
    setRequestSent(true);
  };

  const openImageModal = (index: number) => {
    setModalIndex(index);
    setOpenModal(true);
  };

  const prevImage = () => {
    if (!item) return;
    setModalIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    if (!item) return;
    setModalIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
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
        <Button
          size="sm"
          color="neutral"
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ alignSelf: "flex-start" }}
        >
          بازگشت
        </Button>

        <Typography level="h4" fontWeight="bold">{item.title}</Typography>

        {/* تصویر اصلی */}
        <Box sx={{ position: "relative", cursor: "pointer" }} onClick={() => openImageModal(item.images.indexOf(mainImage))}>
          <img
            src={mainImage}
            alt={item.title}
            style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 8, border: "1px solid #ddd" }}
          />
        </Box>

        {/* تصاویر کوچک */}
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
                border: img === mainImage ? "2px solid #1976d2" : "1px solid #ccc",
              }}
            />
          ))}
        </div>

        <Typography><strong>دسته:</strong> {item.category}</Typography>
        <Typography><strong>قیمت اجاره:</strong> {item.price.toLocaleString()} تومان</Typography>
        <Typography>{item.description}</Typography>

        <Stack spacing={2} mt={2}>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="تاریخ شروع اجاره" />
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="تاریخ پایان اجاره" />
        </Stack>

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

      {/* مودال */}
      {openModal && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 16, right: 16, bgcolor: "rgba(255,255,255,0.8)" }}
            onClick={() => setOpenModal(false)}
          >
            <FiX />
          </IconButton>

          <IconButton
            sx={{ position: "absolute", top: "50%", left: 16, transform: "translateY(-50%)", bgcolor: "rgba(255,255,255,0.5)" }}
            onClick={prevImage}
          >
            <FiChevronLeft />
          </IconButton>

          <img
            src={item.images[modalIndex]}
            alt="تصویر بزرگ"
            style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 8 }}
          />

          <IconButton
            sx={{ position: "absolute", top: "50%", right: 16, transform: "translateY(-50%)", bgcolor: "rgba(255,255,255,0.5)" }}
            onClick={nextImage}
          >
            <FiChevronRight />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ItemDetailsPage;

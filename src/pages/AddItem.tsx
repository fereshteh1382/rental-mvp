import React, { useState, useEffect } from "react";
import {
  Sheet,
  Typography,
  Input,
  Textarea,
  Button,
  Stack,
  Box,
  Select,
  Option,
  IconButton,
} from "@mui/joy";
import { FiTrash2, FiUpload } from "react-icons/fi";
import { mockItems } from "../mockData";

interface AddItemProps {
  mode?: "add" | "edit";
  itemId?: number;
  onBack?: () => void;
}

export default function AddItem({
  mode = "add",
  itemId,
  onBack,
}: AddItemProps) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [] as File[],
    previewUrls: [] as string[],
  });
  // 🔹 خواندن داده‌ها از localStorage یا mockData اولیه
  const getStoredItems = () => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : mockItems;
  };

  // 📦 در حالت ویرایش: لود اطلاعات آیتم
  useEffect(() => {
    if (mode === "edit" && itemId) {
      const items = getStoredItems();
      const item = items.find((i: any) => i.id === itemId);
      if (item) {
        setFormData({
          name: item.title,
          description: item.description,
          price: item.price.toString(),
          category: item.category || "",
          images: [],
          previewUrls: item.images || [],
        });
      }
    }
  }, [mode, itemId]);


  // 📌 تغییر فیلدهای متنی
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 تغییر انتخاب دسته‌بندی
  const handleSelect = (_: any, value: string | null) => {
    if (value) setFormData({ ...formData, category: value });
  };

  // 📌 انتخاب چند تصویر
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
      previewUrls: [...prev.previewUrls, ...previewUrls],
    }));
  };

  // 📌 حذف تصویر
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      const newPreviews = [...prev.previewUrls];
      newImages.splice(index, 1);
      newPreviews.splice(index, 1);
      return { ...prev, images: newImages, previewUrls: newPreviews };
    });
  };

  // 📌 ارسال فرم
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const items = getStoredItems();

    if (mode === "edit" && itemId) {
      // ✏️ ویرایش آیتم موجود
      const updated = items.map((item: any) =>
        item.id === itemId
          ? {
            ...item,
            title: formData.name,
            description: formData.description,
            price: parseInt(formData.price),
            category: formData.category,
            images: formData.previewUrls,
          }
          : item
      );
      localStorage.setItem("items", JSON.stringify(updated));
      alert("✅ وسیله با موفقیت ویرایش شد!");
      console.log(items);
    } else {
      // ➕ افزودن آیتم جدید
      const newItem = {
        id: Date.now(),
        title: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        category: formData.category,
        images: formData.previewUrls,
      };
      const updated = [...items, newItem];
      localStorage.setItem("items", JSON.stringify(updated));
      alert("✅ وسیله با موفقیت اضافه شد!");
    }

    if (onBack) onBack();
  };
  return (
    <Sheet
      variant="outlined"
      sx={{
        maxWidth: 650,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: "lg",
        boxShadow: "md",
        bgcolor: "background.body",
        direction: "rtl",
      }}
    >
      <Typography level="h4" textAlign="center" mb={2}>
        {mode === "edit" ? "ویرایش وسیله" : "افزودن وسیله جدید"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* نام وسیله */}
          <Box>
            <Typography level="body-sm">نام وسیله</Typography>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="مثلاً دوربین عکاسی"
              required
              sx={{ mt: 0.5 }}
            />
          </Box>

          {/* توضیحات */}
          <Box>
            <Typography level="body-sm">توضیحات</Typography>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="توضیح کوتاه درباره وسیله..."
              minRows={3}
              sx={{ mt: 0.5 }}
            />
          </Box>

          {/* قیمت */}
          <Box>
            <Typography level="body-sm">قیمت اجاره (تومان)</Typography>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="مثلاً 200000"
              required
              sx={{ mt: 0.5 }}
            />
          </Box>

          {/* دسته‌بندی */}
          <Box>
            <Typography level="body-sm">دسته‌بندی</Typography>
            <Select
              placeholder="انتخاب دسته"
              value={formData.category}
              onChange={handleSelect}
              sx={{ mt: 0.5 }}
            >
              <Option value="tools">ابزار</Option>
              <Option value="furniture">مبلمان</Option>
              <Option value="electronics">الکترونیک</Option>
              <Option value="other">سایر</Option>
            </Select>
          </Box>

          {/* آپلود چند تصویر */}
          <Box>
            <Typography level="body-sm">تصاویر وسیله</Typography>
            <Button
              component="label"
              startDecorator={<FiUpload />}
              variant="outlined"
              color="primary"
              sx={{ mt: 0.5 }}
            >
              انتخاب تصاویر
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                sx={{ display: "none" }}
              />
            </Button>

            {/* نمایش پیش‌نمایش تصاویر */}
            {formData.previewUrls.length > 0 && (
              <Box
                sx={{
                  mt: 2,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                  gap: 1.5,
                }}
              >
                {formData.previewUrls.map((url, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      borderRadius: "md",
                      overflow: "hidden",
                      boxShadow: "sm",
                    }}
                  >
                    <img
                      src={url}
                      alt={`تصویر ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      variant="solid"
                      color="danger"
                      size="sm"
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        bgcolor: "rgba(255,255,255,0.8)",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FiTrash2 />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button type="submit" color="primary" variant="solid" sx={{ flex: 1 }}>
              {mode === "edit" ? "به‌روزرسانی وسیله" : "ثبت وسیله"}
            </Button>
            {onBack && (
              <Button
                variant="outlined"
                color="neutral"
                onClick={onBack}
                sx={{ flex: 1 }}
              >
                بازگشت
              </Button>
            )}
          </Stack>


        </Stack>
      </form>
    </Sheet>
  );
}

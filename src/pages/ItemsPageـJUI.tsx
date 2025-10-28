// src/pages/ItemsPage.tsx
import React, { useEffect, useState } from "react";
import { Sheet, Typography, Button, Box, Stack, Select, Option, Input } from "@mui/joy";
import { Link } from "react-router-dom";
import { mockItems } from "../mockData";
import type { Item } from "../types";



const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  useEffect(() => {
    async function fetchItems() {
      // در MVP از mock استفاده می‌کنیم
      setItems(mockItems);
      setLoading(false);
    }
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const categoryMatch = categoryFilter === "all" || item.category === categoryFilter;
    const priceMatch = maxPrice === "" || item.price <= Number(maxPrice);
    return categoryMatch && priceMatch;
  });

  if (loading) return <Typography>در حال بارگذاری وسایل...</Typography>;

  return (
    <Box p={3} dir="rtl">
      <Typography level="h4" mb={3}>
        لیست وسایل
      </Typography>

      {/* فیلتر */}
      <Stack direction="row" spacing={2} mb={4}>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          placeholder="دسته بندی"
          sx={{ minWidth: 150 }}
        >
          <Option value="all">همه دسته‌ها</Option>
          <Option value="electronics">الکترونیک</Option>
          <Option value="furniture">مبلمان</Option>
          <Option value="tools">ابزار</Option>
        </Select>

        <Input
          type="number"
          placeholder="حداکثر قیمت"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          sx={{ width: 150 }}
        />
      </Stack>

      {/* کارت وسایل */}
      <Stack direction="row" spacing={3} flexWrap="wrap">
        {filteredItems.map((item) => (
          <Sheet
            key={item.id}
            variant="outlined"
            sx={{
              width: 250,
              p: 2,
              mb: 3,
              borderRadius: 2,
              boxShadow: "sm",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 8 }}
            />
            <Typography level="h6">{item.title}</Typography>
            <Typography>{item.description}</Typography>
            <Typography fontWeight="lg">{item.price} تومان</Typography>
            <Box mt={1} textAlign="center">
              <Button
                component={Link}
                to={`/items/${item.id}`}
                variant="solid"
                color="primary"
              >
                جزئیات
              </Button>
            </Box>
          </Sheet>
        ))}
      </Stack>
    </Box>
  );
};

export default ItemsPage;

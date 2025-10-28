import React, { useEffect, useState } from "react";
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
     /* try {
        const res = await fetch("/api/items"); // مسیر API خودت
        const data: Item[] = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
      } finally {
        setLoading(false);
      }*/

      setItems(mockItems);
setLoading(false);
    }



    fetchItems();
  }, []);

  // فیلتر وسایل
  const filteredItems = items.filter((item) => {
    const categoryMatch =
      categoryFilter === "all" || item.category === categoryFilter;
    const priceMatch =
      maxPrice === "" || item.price <= Number(maxPrice);
    return categoryMatch && priceMatch;
  });

  if (loading) return <p>در حال بارگذاری وسایل...</p>;

  return (
    <div className="p-4" dir="rtl">
      <h1 className="text-2xl mb-4">لیست وسایل</h1>

      {/* فیلتر */}
      <div className="flex gap-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2"
        >
          <option value="all">همه دسته‌ها</option>
          <option value="electronics">الکترونیک</option>
          <option value="furniture">مبلمان</option>
          <option value="tools">ابزار</option>
        </select>

        <input
          type="number"
          placeholder="حداکثر قیمت"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
          className="border p-2"
        />
      </div>

      {/* کارت وسایل */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="border rounded p-4 shadow">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p>{item.description}</p>
            <p className="mt-2 font-semibold">{item.price} تومان</p>
            <div className="mt-2 flex justify-center">
            <Link
              to={`/items/${item.id}`}
              className="mt-2 inline-block bg-blue-500 text-black px-4 py-2 rounded"
            >
              جزئیات
            </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;
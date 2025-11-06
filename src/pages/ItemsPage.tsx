import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mockItems } from "../mockData";
import type { Item } from "../types";

const getStoredItems = () => {
  const saved = localStorage.getItem("items");
  return saved ? JSON.parse(saved) : mockItems;
};

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  useEffect(() => {
    setItems(getStoredItems());
    setLoading(false);
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
      <h1 className="text-2xl mb-4 font-bold">لیست وسایل</h1>

      {/* فیلتر */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">همه دسته‌ها</option>
          <option value="electronics">الکترونیک</option>
          <option value="furniture">مبلمان</option>
          <option value="tools">ابزار</option>
          <option value="other">سایر</option>
        </select>

        <input
          type="number"
          placeholder="حداکثر قیمت"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="border p-2 rounded"
        />
      </div>

      {/* کارت وسایل */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const [mainImage, setMainImage] = useState<string>(
    Array.isArray(item.images) ? item.images[0] : item.images
  );
  const [startIdx, setStartIdx] = useState<number>(0); // شروع نمایش بندانگشتی‌ها

  const thumbsPerPage = 4; // تعداد بندانگشتی‌ها در هر صفحه

  if (!Array.isArray(item.images)) item.images = [item.images];

  const totalThumbs = item.images.length;
  const visibleThumbs = item.images.slice(startIdx, startIdx + thumbsPerPage);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - thumbsPerPage, 0));
  };

  const handleNext = () => {
    setStartIdx((prev) =>
      Math.min(prev + thumbsPerPage, totalThumbs - thumbsPerPage)
    );
  };

  return (
    <div className="border rounded-lg shadow bg-white p-4">
      <div className="relative">
        <img
          src={mainImage}
          alt={item.title}
          className="w-full h-52 object-cover rounded-lg transition-all"
        />

        {/* بندانگشتی‌ها با اسلایدر */}
        {totalThumbs > 1 && (
          <div className="mt-2 flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={startIdx === 0}
              className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              ◀
            </button>
            <div className="flex gap-2 overflow-hidden">
              {visibleThumbs.map((img, idx) => (
                <img
                  key={idx + startIdx}
                  src={img}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all ${
                    mainImage === img
                      ? "border-blue-500"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={startIdx + thumbsPerPage >= totalThumbs}
              className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              ▶
            </button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-bold mt-3">{item.title}</h2>
      <p className="text-gray-600 mt-1">{item.description}</p>
      <p className="mt-2 font-semibold text-blue-600">{item.price} تومان</p>

      <div className="mt-3 flex justify-center">
        <Link
          to={`/items/${item.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          مشاهده جزئیات
        </Link>
      </div>
    </div>
  );
};

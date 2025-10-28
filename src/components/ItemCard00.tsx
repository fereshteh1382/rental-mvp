// src/components/ItemCard.tsx
import React from "react";
import type { Item } from "../types";

interface Props {
  item: Item;
  onEdit?: (item: Item) => void;
  onDelete?: (itemId: string) => void;
}

const ItemCard: React.FC<Props> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="border rounded p-4 shadow text-right flex flex-col" dir="rtl">
      <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded mb-2"/>
      <h2 className="text-xl font-bold">{item.title}</h2>
      <p>{item.description}</p>
      <p className="mt-2 font-semibold">{item.price} تومان</p>
      <div className="mt-2 flex gap-2">
        {onEdit && (
          <button
            className="px-3 py-1 bg-yellow-400 rounded text-white"
            onClick={() => onEdit(item)}
          >
            ویرایش
          </button>
        )}
        {onDelete && (
          <button
            className="px-3 py-1 bg-red-500 rounded text-white"
            onClick={() => onDelete(item.id)}
          >
            حذف
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;

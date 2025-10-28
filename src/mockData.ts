import type { Item, Request } from "./types";

export const mockItems: Item[] = [
  
    {
      id: "1",
      title: "دریل برقی",
      description: "دریل برقی حرفه‌ای با قدرت بالا",
      price: 200000,
      imageUrl: "/img/items.jpeg",
      category: "tools",
    },
    {
      id: "2",
      title: "میز مطالعه",
      description: "میز چوبی زیبا و مقاوم",
      price: 500000,
      imageUrl: "/img/items.jpeg",
      category: "furniture",
    },
    {
      id: "3",
      title: "هدفون بلوتوث",
      description: "هدفون با کیفیت عالی",
      price: 300000,
      imageUrl: "/img/items.jpeg",
      category: "electronics",
    },
  
  ];
  export const mockRequests: Request[] = [
    { id: "r1", itemId: "1", itemTitle: "دریل برقی", startDate: "2025-11-01", endDate: "2025-11-05", status: "pending" },
    { id: "r2", itemId: "2", itemTitle: "میز مطالعه", startDate: "2025-11-10", endDate: "2025-11-15", status: "approved" },
  ];
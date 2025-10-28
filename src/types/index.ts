export interface Item {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
  }
  
  export interface Request {
    id: string;
    itemId: string;
    itemTitle: string;
    startDate: string;
    endDate: string;
    status: "pending" | "approved" | "rejected";
  }
 
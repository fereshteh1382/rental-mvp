export interface Item {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string;
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
  interface AddItemProps {
    itemId?: number;
    isEditMode?: boolean;
  }
  
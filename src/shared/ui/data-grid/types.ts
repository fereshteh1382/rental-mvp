export interface Column {
    label: string;
    key: string;
    
    sortable?: boolean;
    filterable?: boolean;
    render?: () => React.ReactNode;
  }
  
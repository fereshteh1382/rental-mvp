
type BaseFieldSchema = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
};

/* ---------- فیلدهای ساده ---------- */

export type TextFieldSchema = BaseFieldSchema & {
  type: "text" | "number" | "email" | "password" | "label";
  min?: number;
  max?: number;
};

/*export type NumberFieldSchema = BaseFieldSchema & {
  type: "number";
  min?: number;
  max?: number;
};*/
export type TextAreaFieldSchema = BaseFieldSchema & {
  type: "textarea";
  ui?: {
    rows?: number;
    minRows?: number;
    maxRows?: number;
    autoSize?: boolean;
  };
};
export type SelectFieldSchema = BaseFieldSchema & {
  type: "select" | "radio" | "checkbox" | "boolean";
  options: { label: string; value: any }[];
  multiple?: boolean;
};
export type AlertFieldSchema = BaseFieldSchema & {
  type: "alert";
  severity?: "error" | "warning" | "info" | "success";
  variant?: "standard" | "outlined" | "filled"; // MUI variants
  color?: "error" | "warning" | "info" | "success"; // MUI colors
  message: string;
};
export type ButtonFieldSchema = BaseFieldSchema & {
  type: "button"; 
  variant?: "contained" | "outlined" | "text"; 
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  onClick?: string; 
  ontype?: "button" | "submit"; 
};

export type DateFieldSchema = BaseFieldSchema & {
  type: "miladidate"| "solardate";
  calendar?: "jalali" | "gregorian";
  minDate?: Date;
  maxDate?: Date;
}

/* ---------- فیلد object ---------- */

export type ObjectFieldSchema = BaseFieldSchema & {
  type: "object";
  fields: FieldSchema[];
};

/* ---------- فیلد array ---------- */

export type ArrayFieldSchema = BaseFieldSchema & {
  type: "array";
  items: FieldSchema | FieldSchema[];
};
/* ---------- فیلد فایل ---------- */
export type FileFieldSchema = BaseFieldSchema & {
  type: "file";
  multiple?: boolean;
  accept?: string; // image/* , .pdf , ...
  maxSizeMB?: number;

};

/* ---------- Union نهایی ---------- */

export type FieldSchema =
  | TextFieldSchema
  | TextAreaFieldSchema
  | SelectFieldSchema
  | DateFieldSchema
  | ObjectFieldSchema
  | ArrayFieldSchema
  | FileFieldSchema
  | AlertFieldSchema
  |ButtonFieldSchema
  ;
/* ---------- فرم ---------- */

export type Schema = {
  title?: string;
  fields: FieldSchema[];
};

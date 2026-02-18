import { z } from "zod";
import type { FieldSchema } from "./types";

export function buildZodSchema(fields: FieldSchema[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let schema: z.ZodTypeAny;

    switch (field.type) {
      /* ---------- text ---------- */
      case "text":
      case "email":
      case "password":
      case "textarea":
      case "number": 
        schema = z.string();
        if (field.required) schema = schema.min(1, "این فیلد الزامی است");
        if ("min" in field && field.min)
          schema = schema.min(field.min, `حداقل ${field.min} کاراکتر`);
        if ("max" in field && field.max)
          schema = schema.max(field.max, `حداکثر ${field.max} کاراکتر`);
        if (field.type === "email")
          schema = schema.email("ایمیل معتبر نیست");
       
        break;

      /* ---------- number ---------- */
     // case "number": 
        /* const numberSchema = z.number({
          invalid_type_error: "عدد معتبر وارد کنید",
        });
        
        schema = z.preprocess(
          (val) => {
            if (val === "" || val === null || val === undefined) return undefined;
        
            const num = Number(val);
            return Number.isNaN(num) ? undefined : num;
          },
          field.min !== undefined && field.max !== undefined
            ? numberSchema.min(field.min).max(field.max)
            : field.min !== undefined
            ? numberSchema.min(field.min)
            : field.max !== undefined
            ? numberSchema.max(field.max)
            : numberSchema
        ); */
        
       // schema = z.coerce.number();
        //if (field.required) schema = schema.min(1, "این فیلد الزامی است");
       /* schema = z.coerce.number({
          required_error: "این فیلد الزامی است",
          invalid_type_error: "عدد معتبر وارد کنید",
        });
      
        if (field.min !== undefined)
          schema = schema.min(field.min, `حداقل ${field.min}`);
      
        if (field.max !== undefined)
          schema = schema.max(field.max, `حداکثر ${field.max}`);
     
        /*  schema = z.preprocess(
            (val) => {
              if (val === "" || val === null || val === undefined) {
                return undefined;
              }
          
              const num = Number(val);
              return Number.isNaN(num) ? undefined : num;
            },
            z.number({
              required_error: "این فیلد الزامی است",
              invalid_type_error: "عدد معتبر وارد کنید",
            })
          );
        break;*/
      
      

      /* ---------- select / radio ---------- */
      case "select":
      case "radio":
        schema = z.any();
        if (field.required)
          schema = schema.refine(Boolean, "یک گزینه انتخاب کنید");
        break;

      /* ---------- boolean ---------- */
      case "checkbox":
      case "boolean":
        schema = z.boolean().optional();
        break;

      /* ---------- date ---------- */
      case "date":
        schema = z.string();
        if (field.required)
          schema = schema.min(1, "تاریخ الزامی است");
        break;

      /* ---------- file ---------- */
      case "file":
        schema = z
          .array(z.instanceof(File))
          .optional();

        if (field.required)
          schema = schema.refine(
            (files) => files && files.length > 0,
            "انتخاب فایل الزامی است"
          );

        if (field.maxSizeMB) {
          schema = schema.refine(
            (files) =>
              !files ||
              files.every(
                (f) => f.size <= field.maxSizeMB! * 1024 * 1024
              ),
            `حجم فایل نباید بیشتر از ${field.maxSizeMB}MB باشد`
          );
        }
        break;

      /* ---------- object ---------- */
      case "object":
        schema = buildZodSchema(field.fields);
        break;

      /* ---------- array ---------- */
      case "array":
        const itemSchema = Array.isArray(field.items)
          ? buildZodSchema(field.items)
          : buildZodSchema([field.items]);
        schema = z.array(itemSchema);
        if (field.required)
          schema = schema.min(1, "حداقل یک آیتم وارد کنید");
        break;

      default:
        schema = z.any();
    }

    shape[field.name] = schema;
  });

  return z.object(shape);
}

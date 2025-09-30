import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),
  description: z.string().min(10, "توضیحات حداقل ۱۰ کاراکتر"),
  price: z.number().positive("قیمت باید مثبت باشد"),
  available: z.boolean(),
});

export type ItemSchema = z.infer<typeof itemSchema>;

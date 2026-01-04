import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  password: z
    .string()
    .min(6, "رمز عبور حداقل ۶ کاراکتر باشد")
    .max(72, "رمز عبور نمی‌تواند بیش از ۷۲ کاراکتر باشد"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

import { z } from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
    email: z.string().email("ایمیل معتبر نیست"),
    phone: z.string().optional(),
    password: z
      .string()
      .min(6, "رمز عبور حداقل ۶ کاراکتر باشد")
      .max(72, "رمز عبور نمی‌تواند بیش از ۷۲ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور مطابقت ندارد",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

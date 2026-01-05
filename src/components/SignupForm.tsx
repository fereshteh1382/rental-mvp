import { Box, Button, Input, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import api from "../services/axios";
import { signupSchema, type SignupFormData } from "../validations/signup.schema";

export default function SignupForm() {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [message, setMessage] = useState("");

  const handleSignup = async (data: SignupFormData) => {
    try {
      await api.post("/register", {
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });

      setMessage("ثبت‌نام موفق 🎉");
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "خطا در ثبت‌نام");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSignup)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Input placeholder="نام کاربری" {...form.register("username")} />
        <Input placeholder="ایمیل" {...form.register("email")} />
        <Input placeholder="تلفن" {...form.register("phone")} />
        <Input placeholder="رمز عبور" type="password" {...form.register("password")} />
        <Input placeholder="تکرار رمز عبور" type="password" {...form.register("confirmPassword")} />
        <Button type="submit">ثبت نام</Button>
        {message && <Typography>{message}</Typography>}
      </Box>
    </form>
  );
}

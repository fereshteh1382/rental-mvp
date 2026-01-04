import { Box, Button, Input, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import api from "../services/axios";
import { loginSchema, type LoginFormData } from "../validations/login.schema";

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [message, setMessage] = useState("");

  const handleLogin = async (data: LoginFormData) => {
    try {
      const res = await api.post("/login", {
        username: data.username,
        password: data.password,
      });

      localStorage.setItem("token", res.data.access_token);
      setMessage("ورود موفق 🎉");
      onSuccess();
    } catch (err: any) {
      setMessage(err.response?.data?.detail || "خطا در ورود");
    }
  };

  return (
    <form onSubmit={loginForm.handleSubmit(handleLogin)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Input placeholder="نام کاربری" {...loginForm.register("username")} />
        <Input placeholder="رمز عبور" type="password" {...loginForm.register("password")} />
        <Button type="submit">ورود</Button>
        {message && <Typography>{message}</Typography>}
      </Box>
    </form>
  );
}

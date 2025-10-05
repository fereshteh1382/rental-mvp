import React, { useState } from "react";
import { Modal, Sheet, Typography, Button, Input, Box, ModalClose, Tabs, TabList, Tab, TabPanel } from "@mui/joy";
import { useUiStore } from "../store/uiStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --- Zod Schemas ---
const signupSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "رمز عبور مطابقت ندارد",
  path: ["confirmPassword"]
});

const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(6, "رمز عبور حداقل ۶ کاراکتر باشد"),
});

type SignupFormData = z.infer<typeof signupSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

export function AuthModal() {
  const { isSignupOpen, closeSignup } = useUiStore();
  const [tab, setTab] = useState(0);

  // فرم‌ها
  const signupForm = useForm<SignupFormData>({ resolver: zodResolver(signupSchema) });
  const loginForm = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const handleSignup = (data: SignupFormData) => {
    console.log("ثبت نام:", data);
    closeSignup();
  };

  const handleLogin = (data: LoginFormData) => {
    console.log("ورود:", data);
    closeSignup();
  };

  return (
    <Modal
      open={isSignupOpen}
      onClose={closeSignup}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          width: { xs: "90%", sm: 400 },
          p: 3,
          borderRadius: "md",
          position: "relative",
          direction: "rtl",
        }}
      >
        <ModalClose variant="outlined" sx={{ position: "absolute", top: 8, right: 8 }} />

        <Tabs value={tab} onChange={(e, value) => setTab(value)}>
          <TabList sx={{ justifyContent: "center", mt: 3 }}>
            <Tab>ورود</Tab>
            <Tab>ثبت نام</Tab>
          </TabList>

          {/* --- Login Tab --- */}
          <TabPanel value={0}>
            <Typography level="h5" sx={{ mb: 2, textAlign: "center" }}>ورود</Typography>
            <form onSubmit={loginForm.handleSubmit(handleLogin)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Input placeholder="ایمیل" {...loginForm.register("email")} error={!!loginForm.formState.errors.email} />
                {loginForm.formState.errors.email && (
                  <Typography color="danger" level="body-sm">{loginForm.formState.errors.email?.message}</Typography>
                )}
                <Input placeholder="رمز عبور" type="password" {...loginForm.register("password")} error={!!loginForm.formState.errors.password} />
                {loginForm.formState.errors.password && (
                  <Typography color="danger" level="body-sm">{loginForm.formState.errors.password?.message}</Typography>
                )}
                <Button type="submit" variant="solid" color="primary">ورود</Button>
              </Box>
            </form>
          </TabPanel>

          {/* --- Signup Tab --- */}
          <TabPanel value={1}>
            <Typography level="h5" sx={{ mb: 2, textAlign: "center" }}>ثبت نام</Typography>
            <form onSubmit={signupForm.handleSubmit(handleSignup)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Input placeholder="نام" {...signupForm.register("name")} error={!!signupForm.formState.errors.name} />
                {signupForm.formState.errors.name && <Typography color="danger" level="body-sm">{signupForm.formState.errors.name.message}</Typography>}

                <Input placeholder="ایمیل" type="email" {...signupForm.register("email")} error={!!signupForm.formState.errors.email} />
                {signupForm.formState.errors.email && <Typography color="danger" level="body-sm">{signupForm.formState.errors.email.message}</Typography>}

                <Input placeholder="رمز عبور" type="password" {...signupForm.register("password")} error={!!signupForm.formState.errors.password} />
                {signupForm.formState.errors.password && <Typography color="danger" level="body-sm">{signupForm.formState.errors.password.message}</Typography>}

                <Input placeholder="تکرار رمز عبور" type="password" {...signupForm.register("confirmPassword")} error={!!signupForm.formState.errors.confirmPassword} />
                {signupForm.formState.errors.confirmPassword && <Typography color="danger" level="body-sm">{signupForm.formState.errors.confirmPassword.message}</Typography>}

                <Button type="submit" variant="solid" color="primary">ثبت نام</Button>
              </Box>
            </form>
          </TabPanel>
        </Tabs>
      </Sheet>
    </Modal>
  );
}

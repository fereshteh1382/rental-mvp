import { Modal, Sheet, ModalClose, Tabs, TabList, Tab, TabPanel } from "@mui/joy";
import { useState } from "react";
import { useUiStore } from "../store/uiStore";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export function AuthModal() {
  const { isSignupOpen, closeSignup } = useUiStore();
  const [tab, setTab] = useState(0);

  return (
    <Modal open={isSignupOpen} onClose={closeSignup} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Sheet variant="outlined" sx={{ width: { xs: "90%", sm: 400 }, p: 3, borderRadius: "md", position: "relative", direction: "rtl" }}>
        <ModalClose variant="outlined" sx={{ position: "absolute", top: 8, right: 8 }} />
        <Tabs value={tab} onChange={(e, value) => setTab(value)}>
          <TabList sx={{ justifyContent: "center", mt: 3 }}>
            <Tab>ورود</Tab>
            <Tab>ثبت نام</Tab>
          </TabList>
          <TabPanel value={0}><LoginForm onSuccess={closeSignup} /></TabPanel>
          <TabPanel value={1}><SignupForm /></TabPanel>
        </Tabs>
      </Sheet>
    </Modal>
  );
}

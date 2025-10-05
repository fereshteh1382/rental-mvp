import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";

// 📄 صفحات
import { HomePage } from "./pages/HomePage";
import { ItemsPage } from "./pages/ItemsPage";
import { ItemDetailPage } from "./pages/ItemDetailPage";
import { DashboardPage } from "./pages/DashboardPage";
import {AuthModal} from "./components/AuthModal";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/items/:id" element={<ItemDetailPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </MainLayout>
      <AuthModal />

    </BrowserRouter>
  );
}

export default App;

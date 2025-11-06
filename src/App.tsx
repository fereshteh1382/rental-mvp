import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";

// 📄 صفحات
import { HomePage } from "./pages/HomePage";
import  ItemsPage  from "./pages/ItemsPage";
import  ItemDetailsPage  from "./pages/ItemDetailPage";
import  Dashboard  from "./pages/Dashboard";
import {AuthModal} from "./components/AuthModal";
import AddItem from "./pages/AddItem";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/items/:id" element={<ItemDetailsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addItem" element={<AddItem />} />
        </Routes>
      </MainLayout>
      <AuthModal />

    </BrowserRouter>
  );
}

export default App;

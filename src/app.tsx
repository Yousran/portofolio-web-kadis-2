import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import NewsPage from "./pages/news-page";
import AwardsPage from "./pages/awards-page";
import PartnersPage from "./pages/partners-page";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AdminPage from "./pages/admin-page";
import HomePage from "./pages/home-page";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen navy-gradient font-sans text-brand-muted selection:bg-brand-primary/30 selection:text-white flex flex-col">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

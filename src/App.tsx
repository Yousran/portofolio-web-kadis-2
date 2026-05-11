import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import NewsPage from "./pages/NewsPage";
import AwardsPage from "./pages/AwardsPage";
import PartnersPage from "./pages/PartnersPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen navy-gradient font-sans text-brand-muted selection:bg-brand-primary/30 selection:text-white flex flex-col">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/awards" element={<AwardsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;

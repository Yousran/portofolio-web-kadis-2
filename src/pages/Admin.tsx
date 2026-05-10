import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2, Plus, Loader2, Lock, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"news" | "awards" | "experiences">("news");
  const [data, setData] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem("is_admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/${activeTab}`);
    const json = await res.json();
    setData(json);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [activeTab, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setIsAuthenticated(true);
      localStorage.setItem("is_admin_authenticated", "true");
      toast.success("Welcome back, Admin");
    } else {
      toast.error("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("is_admin_authenticated");
    toast.info("Logged out");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/${activeTab}/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted successfully");
      fetchData();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    const res = await fetch(`/api/${activeTab}`, {
      method: "POST",
      body: formData, // Sending as multipart/form-data
    });

    if (res.ok) {
      toast.success("Created successfully");
      (e.target as HTMLFormElement).reset();
      fetchData();
    } else {
      toast.error("Failed to create");
    }
    setIsSubmitting(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center navy-gradient px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-3xl bg-white/[0.02] shadow-xl shadow-black/20 border border-white/5 space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="inline-flex p-4 rounded-full bg-brand-primary/10 text-brand-primary mb-2">
              <Lock size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Login</h1>
            <p className="text-gray-400">Please enter your credentials to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <Input label="Username" name="username" required placeholder="admin" />
            <Input label="Password" name="password" type="password" required placeholder="••••••••" />
            <button className="w-full py-3 bg-brand-primary text-brand-dark rounded-xl font-semibold hover:opacity-90 transition-all active:scale-[0.98]">
              Login
            </button>
          </form>
          <p className="text-center text-xs text-gray-500">
            Hint: admin / admin123
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your portfolio content from here.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-brand-primary transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
        {(["news", "awards", "experiences"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? "bg-brand-primary shadow-sm text-brand-dark" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[400px_1fr] gap-12">
        {/* Form Column */}
        <section className="space-y-6">
          <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-white">Add New {activeTab.slice(0, -1)}</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
              {activeTab === "news" && (
                <>
                  <Input label="Title" name="title" required placeholder="Launch of the new app" />
                  <Input label="Tag" name="tag" required placeholder="Project" />
                  <Input label="Link" name="link" required placeholder="https://..." />
                  <Input label="Date" name="date" required placeholder="Dec 20th, 2025" />
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-400">Image File</label>
                    <input type="file" name="image" required accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/5 file:text-white hover:file:bg-white/10" />
                  </div>
                </>
              )}
              {activeTab === "awards" && (
                <>
                  <Input label="Award Title" name="title" required placeholder="App of the Year" />
                  <Input label="Category/Tag" name="tag" required placeholder="Mobile Design" />
                  <Input label="Year" name="year" required placeholder="2025" />
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-400">Award Icon/Image</label>
                    <input type="file" name="image" required accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/5 file:text-white hover:file:bg-white/10" />
                  </div>
                </>
              )}
              {activeTab === "experiences" && (
                <>
                  <Input label="Period" name="period" required placeholder="2022 - 2024" />
                  <Input label="Role" name="role" required placeholder="Lead Designer" />
                  <Input label="Company" name="company" required placeholder="Creative Labs" />
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-400">Description</label>
                    <textarea 
                      name="description" 
                      required 
                      className="w-full px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-primary min-h-[100px] resize-none text-sm bg-black/20 text-white"
                      placeholder="High-level summary of your impact..."
                    />
                  </div>
                </>
              )}
              <button
                disabled={isSubmitting}
                className="w-full py-3 bg-brand-primary text-brand-dark rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                Add Entry
              </button>
            </form>
          </div>
        </section>

        {/* List Column */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold capitalize text-white">All {activeTab}</h2>
            {isLoading && <Loader2 className="animate-spin text-brand-primary" size={20} />}
          </div>
          
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {data.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.01] group hover:bg-white/[0.03] transition-all"
                >
                  <div className="flex gap-4 items-center">
                    {item.image && (
                      <div className="w-12 h-12 rounded-lg bg-black/20 overflow-hidden">
                        <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-white">{item.title || item.role}</h4>
                      <p className="text-xs text-gray-500">{item.tag || item.company} · {item.date || item.year || item.period}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-500 hover:text-brand-primary hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {!isLoading && data.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                <p className="text-gray-500">No {activeTab} found. Create your first entry!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-gray-400">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm transition-all bg-black/20 text-white placeholder:text-gray-600"
    />
  </div>
);

export default Admin;

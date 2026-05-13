import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import LoginForm from "../components/admin/login-form";
import AdminTabs from "../components/admin/admin-tabs";
import EditForm from "../components/admin/edit-form";
import DataTable from "../components/admin/data-table";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "news" | "awards" | "experiences" | "partners"
  >("news");
  const [data, setData] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [filterQuery, setFilterQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const authStatus = localStorage.getItem("is_admin_authenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/${activeTab}`, { cache: "no-store" });
    const json = await res.json();
    setData(json);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [activeTab, isAuthenticated]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filterQuery]);

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

  const handleEdit = (item: any) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const filteredData = data.filter((item: any) =>
    JSON.stringify(item).toLowerCase().includes(filterQuery.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedData = filteredData.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
  );
  const showingStart =
    filteredData.length === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1;
  const showingEnd = Math.min(
    safeCurrentPage * itemsPerPage,
    filteredData.length,
  );

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/${activeTab}/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Deleted successfully");
      setCurrentPage(1);
      fetchData();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);

    if (editingItem?.id) {
      formData.set("id", String(editingItem.id));
      if (editingItem.image) {
        formData.set("existingImage", editingItem.image);
      }
    }

    // Debug logging
    console.log("=== FORM SUBMISSION DEBUG ===");
    console.log("editingItem:", editingItem);
    console.log("activeTab:", activeTab);
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(
        `  ${key}:`,
        typeof value === "string" ? value : `(${(value as File).name})`,
      );
    }
    console.log("=============================");

    const res = await fetch(`/api/${activeTab}`, {
      method: "POST",
      body: formData, // Sending as multipart/form-data
    });

    if (res.ok) {
      toast.success(
        editingItem ? "Updated successfully" : "Created successfully",
      );
      (e.target as HTMLFormElement).reset();
      setEditingItem(null);
      setCurrentPage(1);
      fetchData();
    } else {
      toast.error(editingItem ? "Failed to update" : "Failed to create");
    }
    setIsSubmitting(false);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-400">
            Manage your portfolio content from here.
          </p>
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
        <AdminTabs
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setEditingItem(null);
          }}
        />
      </div>

      <div className="grid lg:grid-cols-[400px_1fr] gap-12">
        <EditForm
          activeTab={activeTab}
          editingItem={editingItem}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={handleCancelEdit}
        />

        <DataTable
          activeTab={activeTab}
          data={data}
          isLoading={isLoading}
          filterQuery={filterQuery}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onFilterChange={setFilterQuery}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

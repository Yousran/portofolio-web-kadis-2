import React from "react";
import { Trash2, Edit2, Filter, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DataTableProps {
  activeTab: "news" | "awards" | "experiences" | "partners";
  data: any[];
  isLoading: boolean;
  filterQuery: string;
  currentPage: number;
  itemsPerPage: number;
  onFilterChange: (query: string) => void;
  onEdit: (item: any) => void;
  onDelete: (id: number) => void;
  onPageChange: (page: number) => void;
}

export default function DataTable({
  activeTab,
  data,
  isLoading,
  filterQuery,
  currentPage,
  itemsPerPage,
  onFilterChange,
  onEdit,
  onDelete,
  onPageChange,
}: DataTableProps) {
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

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold capitalize text-white">
          All {activeTab}
        </h2>
        {isLoading && (
          <Loader2 className="animate-spin text-brand-primary" size={20} />
        )}
      </div>

      <div className="relative">
        <Filter size={18} className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          value={filterQuery}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm bg-black/20 text-white placeholder:text-gray-600"
        />
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {paginatedData.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/1 group hover:bg-white/3 transition-all"
            >
              <div className="flex gap-4 items-center">
                {item.image && (
                  <div className="w-12 h-12 rounded-lg bg-black/20 overflow-hidden">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-white">
                    {item.title || item.role}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item.tag || item.company} ·{" "}
                    {item.date || item.year || item.period}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 text-gray-500 hover:text-brand-primary hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {!isLoading && filteredData.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-gray-500">
              {filterQuery
                ? "No results found."
                : `No ${activeTab} found. Create your first entry!`}
            </p>
          </div>
        )}
      </div>

      {!isLoading && filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <p className="text-sm text-gray-500">
            Showing {showingStart}-{showingEnd} of {filteredData.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
              disabled={safeCurrentPage === 1}
              className="px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/5 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm text-white">
              Page {safeCurrentPage} of {totalPages}
            </div>
            <button
              type="button"
              onClick={() =>
                onPageChange(Math.min(totalPages, safeCurrentPage + 1))
              }
              disabled={safeCurrentPage === totalPages}
              className="px-4 py-2 rounded-xl border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/5 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

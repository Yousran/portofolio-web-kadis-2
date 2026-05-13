import React from "react";
import { Loader2, Plus } from "lucide-react";

const Input = ({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1.5">
    <label className="text-sm font-medium text-gray-400">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm transition-all bg-black/20 text-white placeholder:text-gray-600"
    />
  </div>
);

interface EditFormProps {
  activeTab: "news" | "awards" | "experiences" | "partners";
  editingItem: any | null;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export default function EditForm({
  activeTab,
  editingItem,
  isSubmitting,
  onSubmit,
  onCancel,
}: EditFormProps) {
  return (
    <section className="space-y-6">
      <div className="p-6 rounded-3xl border border-white/5 bg-white/2 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {editingItem
              ? `Edit ${activeTab.slice(0, -1)}`
              : `Add New ${activeTab.slice(0, -1)}`}
          </h2>
          {editingItem && (
            <button
              onClick={onCancel}
              className="text-xs text-gray-400 hover:text-white px-2 py-1"
            >
              Cancel
            </button>
          )}
        </div>
        <form
          key={editingItem?.id || "new"}
          onSubmit={onSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {activeTab === "news" && (
            <>
              {editingItem?.id && (
                <input type="hidden" name="id" value={editingItem.id} />
              )}
              <Input
                label="Title"
                name="title"
                required
                placeholder="Launch of the new app"
                defaultValue={editingItem?.title}
              />
              <Input
                label="Tag"
                name="tag"
                required
                placeholder="Project"
                defaultValue={editingItem?.tag}
              />
              <Input
                label="Link"
                name="link"
                required
                placeholder="https://..."
                defaultValue={editingItem?.link}
              />
              <Input
                label="Date"
                name="date"
                required
                placeholder="Dec 20th, 2025"
                defaultValue={editingItem?.date}
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Image File
                </label>
                <input
                  type="file"
                  name="image"
                  required={!editingItem}
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/5 file:text-white hover:file:bg-white/10"
                />
                {editingItem?.image && (
                  <p className="text-xs text-gray-500">
                    Current: {editingItem.image}
                  </p>
                )}
              </div>
            </>
          )}
          {activeTab === "awards" && (
            <>
              {editingItem?.id && (
                <input type="hidden" name="id" value={editingItem.id} />
              )}
              <Input
                label="Award Title"
                name="title"
                required
                placeholder="App of the Year"
                defaultValue={editingItem?.title}
              />
              <Input
                label="Category/Tag"
                name="tag"
                required
                placeholder="Mobile Design"
                defaultValue={editingItem?.tag}
              />
              <Input
                label="Year"
                name="year"
                required
                placeholder="2025"
                defaultValue={editingItem?.year}
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Award Icon/Image
                </label>
                <input
                  type="file"
                  name="image"
                  required={!editingItem}
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/5 file:text-white hover:file:bg-white/10"
                />
                {editingItem?.image && (
                  <p className="text-xs text-gray-500">
                    Current: {editingItem.image}
                  </p>
                )}
              </div>
            </>
          )}
          {activeTab === "experiences" && (
            <>
              {editingItem?.id && (
                <input type="hidden" name="id" value={editingItem.id} />
              )}
              <Input
                label="Period"
                name="period"
                required
                placeholder="2022 - 2024"
                defaultValue={editingItem?.period}
              />
              <Input
                label="Role"
                name="role"
                required
                placeholder="Lead Designer"
                defaultValue={editingItem?.role}
              />
              <Input
                label="Company"
                name="company"
                required
                placeholder="Creative Labs"
                defaultValue={editingItem?.company}
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  className="w-full px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-primary min-h-25 resize-none text-sm bg-black/20 text-white"
                  placeholder="High-level summary of your impact..."
                  defaultValue={editingItem?.description}
                />
              </div>
            </>
          )}
          {activeTab === "partners" && (
            <>
              {editingItem?.id && (
                <input type="hidden" name="id" value={editingItem.id} />
              )}
              <Input
                label="Partner Name"
                name="title"
                required
                placeholder="Partner"
                defaultValue={editingItem?.title}
              />
              <Input
                label="Year"
                name="year"
                required
                placeholder="2025"
                defaultValue={editingItem?.year}
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400">
                  Partner Image
                </label>
                <input
                  type="file"
                  name="image"
                  required={!editingItem}
                  accept="image/*"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/5 file:text-white hover:file:bg-white/10"
                />
                {editingItem?.image && (
                  <p className="text-xs text-gray-500">
                    Current: {editingItem.image}
                  </p>
                )}
              </div>
            </>
          )}

          <button
            disabled={isSubmitting}
            className="w-full py-3 bg-brand-primary text-brand-dark rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Plus size={18} />
            )}
            {editingItem ? "Update Entry" : "Add Entry"}
          </button>
        </form>
      </div>
    </section>
  );
}

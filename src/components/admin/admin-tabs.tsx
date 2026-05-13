import React from "react";

interface AdminTabsProps {
  activeTab: "news" | "awards" | "experiences" | "partners";
  onTabChange: (tab: "news" | "awards" | "experiences" | "partners") => void;
}

export default function AdminTabs({ activeTab, onTabChange }: AdminTabsProps) {
  return (
    <div className="flex gap-2 p-1 bg-white/5 rounded-xl w-fit">
      {(["news", "awards", "experiences", "partners"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
            activeTab === tab
              ? "bg-brand-primary shadow-sm text-brand-dark"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

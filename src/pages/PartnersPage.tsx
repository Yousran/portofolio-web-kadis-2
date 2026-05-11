import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

interface AwardSource {
  id: number;
  title: string;
  year: string;
  image: string;
  createdAt?: string;
}

interface PartnerItem {
  id: number;
  name: string;
  year: string;
  image: string;
  createdAt?: string;
}

const PartnersPage = () => {
  const [partners, setPartners] = useState<PartnerItem[]>([]);

  useEffect(() => {
    fetch("/api/awards", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: AwardSource[]) =>
        setPartners(
          data.map((item) => ({
            id: item.id,
            name: item.title,
            year: item.year,
            image: item.image,
            createdAt: item.createdAt,
          })),
        ),
      );
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
          <Users size={16} />
          <span>Partners</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white">Partners & Collaborations</h1>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
          Partners page is populated from the Awards data source, mapped into partner fields.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {partners.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex flex-col space-y-6"
          >
            <div className="aspect-16/10 overflow-hidden rounded-3xl bg-white/5 shadow-sm group-hover:shadow-xl transition-all duration-500">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              ) : null}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark px-3 py-1 rounded-full bg-brand-primary border border-brand-primary/20">
                  Partner
                </span>
                <span className="text-xs font-medium text-gray-500">{item.year}</span>
              </div>
              <h3 className="text-2xl font-bold leading-tight group-hover:text-brand-primary transition-colors text-white">
                {item.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {partners.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-gray-400">The partners archive is currently empty. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default PartnersPage;
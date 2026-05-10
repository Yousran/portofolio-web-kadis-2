import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface Award { id: number; title: string; tag: string; year: string; image: string; }

const AwardsPage = () => {
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    fetch("/api/awards").then(res => res.json()).then(setAwards);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-16">
      <div className="space-y-4 text-center items-center flex flex-col">
        <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
          <Trophy size={16} />
          <span>Recognition</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">Awards & Recognition</h1>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
          Celebrating excellence in design, innovation, and technological impact over the years.
        </p>
      </div>

      <div className="grid gap-6">
        {awards.map((award, index) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group grid md:grid-cols-[100px_1fr_120px] items-center gap-8 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
          >
            <div className="text-3xl font-black text-brand-muted group-hover:text-white transition-colors">{award.year}</div>
            <div className="flex items-center gap-6">
              {award.image && (
                <div className="w-16 h-16 rounded-2xl bg-white/5 p-2 shadow-sm border border-white/10 flex-shrink-0">
                  <img src={award.image} alt={award.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight text-white">{award.title}</h3>
                <p className="text-gray-400 font-medium">{award.tag}</p>
              </div>
            </div>
            <Trophy size={32} className="hidden md:block text-white/10 group-hover:text-brand-primary group-hover:rotate-12 transition-all ml-auto" />
          </motion.div>
        ))}
      </div>

      {awards.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-gray-400">Awards list is pending update. Stay tuned!</p>
        </div>
      )}
    </div>
  );
};

export default AwardsPage;

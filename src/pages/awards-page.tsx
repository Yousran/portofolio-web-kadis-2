import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface Award {
  id: number;
  title: string;
  tag: string;
  year: string;
  image: string;
}
interface News {
  id: number;
  image: string;
}

export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);

  useEffect(() => {
    fetch("/api/awards", { cache: "no-store" })
      .then((res) => res.json())
      .then(setAwards);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
          <Trophy size={16} />
          <span>Full Archive</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Awards & Recognition
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
          The latest achievements, recognitions, and milestones from the
          portfolio journey.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {awards.map((item, index) => {
          const awardsImage =
            awards.length > 0
              ? awards[index % awards.length]?.image
              : undefined;
          const imageSrc = awardsImage || item.image;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col space-y-6"
            >
              <div className="aspect-16/10 overflow-hidden rounded-3xl bg-white/5 shadow-sm group-hover:shadow-xl transition-all duration-500">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark px-3 py-1 rounded-full bg-brand-primary border border-brand-primary/20">
                    {item.tag}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold leading-tight group-hover:text-brand-primary transition-colors text-white">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {awards.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-gray-400">
            The archive is currently empty. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}

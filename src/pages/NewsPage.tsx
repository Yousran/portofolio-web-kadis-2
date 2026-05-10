import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

interface News { id: number; title: string; tag: string; date: string; image: string; }

const NewsPage = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    fetch("/api/news").then(res => res.json()).then(setNews);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-24 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
          <Newspaper size={16} />
          <span>Full Archive</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white">Latest News & Blog</h1>
        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
          The latest industry insights, project launches, and design deep-dives from my studio.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex flex-col space-y-6"
          >
            <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-white/5 shadow-sm group-hover:shadow-xl transition-all duration-500">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark px-3 py-1 rounded-full bg-brand-primary border border-brand-primary/20">{item.tag}</span>
                <span className="text-xs font-medium text-gray-500">{item.date}</span>
              </div>
              <h3 className="text-2xl font-bold leading-tight group-hover:text-brand-primary transition-colors text-white">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {news.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-gray-400">The archive is currently empty. Check back soon!</p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;

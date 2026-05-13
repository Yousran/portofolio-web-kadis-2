import React from "react";
import { Link } from "react-router-dom";
import { Newspaper, ArrowRight } from "lucide-react";
import { motion, cubicBezier } from "framer-motion";

interface News {
  id: number;
  title: string;
  tag: string;
  date: string;
  image: string;
  link: string;
}

interface NewsSectionProps {
  news: News[];
}

const SECTION_ANIMATION = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: cubicBezier(0.21, 0.47, 0.32, 0.98) },
};

export default function NewsSection({ news }: NewsSectionProps) {
  return (
    <motion.section id="news" {...SECTION_ANIMATION} className="space-y-16">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
            <Newspaper size={16} />
            <span>Updates</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Latest News
          </h2>
        </div>
        <Link
          to="/news"
          className="group flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-brand-primary transition-colors"
        >
          View all news{" "}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((item, index) => (
          <motion.a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col space-y-4"
          >
            <div className="aspect-16/10 overflow-hidden rounded-2xl bg-white/5 shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark px-2 py-0.5 rounded-full bg-brand-primary border border-brand-primary/20">
                  {item.tag}
                </span>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
              <h3 className="text-lg font-bold leading-tight group-hover:text-brand-primary transition-colors text-white">
                {item.title}
              </h3>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}

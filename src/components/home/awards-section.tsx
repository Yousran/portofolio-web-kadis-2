import React from "react";
import { Link } from "react-router-dom";
import { Trophy, ArrowRight } from "lucide-react";
import { motion, cubicBezier } from "framer-motion";

interface Award {
  id: number;
  title: string;
  tag: string;
  year: string;
  image: string;
}

interface AwardsSectionProps {
  awards: Award[];
}

const SECTION_ANIMATION = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: cubicBezier(0.21, 0.47, 0.32, 0.98) },
};

export default function AwardsSection({ awards }: AwardsSectionProps) {
  return (
    <motion.section id="awards" {...SECTION_ANIMATION} className="space-y-16">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
            <Trophy size={16} />
            <span>Recognition</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Awards & Honors
          </h2>
        </div>
        <Link
          to="/awards"
          className="group flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-brand-primary transition-colors"
        >
          View all awards{" "}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {awards.map((award, index) => {
          const awardsImage =
            awards.length > 0
              ? awards[index % awards.length]?.image
              : undefined;
          const imageSrc = awardsImage || award.image;

          return (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group flex flex-col space-y-6"
            >
              <div className="aspect-16/10 overflow-hidden rounded-3xl bg-white/5 shadow-sm group-hover:shadow-xl transition-all duration-500">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={award.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark px-3 py-1 rounded-full bg-brand-primary border border-brand-primary/20">
                    {award.tag}
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    {award.year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold leading-tight group-hover:text-brand-primary transition-colors text-white">
                  {award.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

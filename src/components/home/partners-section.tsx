import React from "react";
import { Link } from "react-router-dom";
import { Handshake, ArrowRight } from "lucide-react";
import { motion, cubicBezier } from "framer-motion";

interface Partner {
  id: number;
  title: string;
  year: string;
  image: string;
}

interface PartnersSectionProps {
  partners: Partner[];
}

const SECTION_ANIMATION = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: cubicBezier(0.21, 0.47, 0.32, 0.98) },
};

export default function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <motion.section id="partners" {...SECTION_ANIMATION} className="space-y-16">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
            <Handshake size={16} />
            <span>Collaboration</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Partners
          </h2>
        </div>
        <Link
          to="/partners"
          className="group flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-brand-primary transition-colors"
        >
          View all partners{" "}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {partners.map((partner, index) => {
          const partnersImage =
            partners.length > 0
              ? partners[index % partners.length]?.image
              : undefined;
          const imageSrc = partnersImage || partner.image;

          return (
            <motion.div
              key={partner.id}
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
                    alt={partner.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-500">
                    {partner.year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold leading-tight group-hover:text-brand-primary transition-colors text-white">
                  {partner.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

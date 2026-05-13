import React from "react";
import { Briefcase } from "lucide-react";
import { motion, cubicBezier } from "framer-motion";

interface Experience {
  id: number;
  period: string;
  role: string;
  company: string;
  description: string;
}

interface ExperiencesSectionProps {
  experiences: Experience[];
}

const SECTION_ANIMATION = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: cubicBezier(0.21, 0.47, 0.32, 0.98) },
};

export default function ExperiencesSection({
  experiences,
}: ExperiencesSectionProps) {
  return (
    <motion.section
      id="experience"
      {...SECTION_ANIMATION}
      className="space-y-16"
    >
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
            <Briefcase size={16} />
            <span>Journey</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Professional Experience
          </h2>
        </div>
      </div>
      <div className="grid gap-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative grid md:grid-cols-[200px_1fr] gap-4 p-8 rounded-3xl border border-white/5 bg-white/2 hover:bg-white/5 hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500"
          >
            <div className="text-brand-muted font-medium">{exp.period}</div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                {exp.role} · {exp.company}
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-2xl">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
        {experiences.length === 0 && (
          <p className="text-brand-muted italic">
            No experience entries yet. Add some in the admin panel.
          </p>
        )}
      </div>
    </motion.section>
  );
}

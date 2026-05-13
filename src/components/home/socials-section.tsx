import React from "react";
import {
  Facebook,
  Instagram,
  Music,
  X,
  Twitter,
  Share2,
  ArrowRight,
} from "lucide-react";
import { motion, cubicBezier } from "framer-motion";

interface SocialMedia {
  id: string;
  name: string;
  icon: React.ReactNode;
  link: string;
  image: string;
}

interface SocialsSectionProps {
  channels?: SocialMedia[];
}

const SECTION_ANIMATION = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: cubicBezier(0.21, 0.47, 0.32, 0.98) },
};

const DEFAULT_CHANNELS: SocialMedia[] = [
  {
    id: "fb",
    name: "Facebook",
    icon: <Facebook size={20} />,
    link: "https://www.facebook.com/roem.yorke.1/#",
    image: "/uploads/about-me.jpeg",
  },
  {
    id: "ig",
    name: "Instagram",
    icon: <Instagram size={20} />,
    link: "https://www.instagram.com/roemyorke/",
    image: "/uploads/about-me.jpeg",
  },
  {
    id: "tt",
    name: "TikTok",
    icon: <Music size={20} />,
    link: "https://www.tiktok.com/@roemyorke",
    image: "/uploads/about-me.jpeg",
  },
  {
    id: "tw",
    name: "X",
    icon: <Twitter size={20} />,
    link: "https://x.com/roemyorke",
    image: "/uploads/about-me.jpeg",
  },
];

export default function SocialsSection({
  channels = DEFAULT_CHANNELS,
}: SocialsSectionProps) {
  return (
    <motion.section {...SECTION_ANIMATION} className="space-y-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
          <Share2 size={16} />
          <span>Social Media</span>
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white">
          Contact Me
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 overflow-hidden rounded-3xl border border-white/10">
        {channels.map((channel, index) => (
          <motion.a
            key={channel.id}
            href={channel.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden bg-black border-r border-white/10 last:border-r-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={channel.image}
                alt={channel.name}
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-x-6 bottom-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white group-hover:bg-brand-primary group-hover:text-black transition-colors">
                  {channel.icon}
                </div>
                <span className="font-bold text-white text-lg">
                  {channel.name}
                </span>
              </div>
              <div className="p-2 border border-white/20 rounded-full text-white group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight size={20} />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedMarqueeHero } from "../components/ui/hero-3";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Newspaper, Briefcase, User, Sparkles } from "lucide-react";
import AboutUsSection from "../components/ui/about-me";

interface News { id: number; title: string; tag: string; date: string; image: string; }
interface Award { id: number; title: string; tag: string; year: string; image: string; }
interface Experience { id: number; period: string; role: string; company: string; description: string; }

const SECTION_ANIMATION = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
};

const DEMO_IMAGES = [
  "/uploads/images (1).jpg",
  "/uploads/9172fa2f-c2f9-407e-9a9b-7bbaec0bc560-1024x682.jpeg",
  "/uploads/makassar_689f1346703a7cd307e22d4540491ea3-720x405.jpg",
  "/uploads/83360f85-18ab-4fa3-a344-35d12bad0d5a.jpeg",
  "/uploads/0c64a4a1-0ee4-42f8-9502-7ecd37bc5e3a-1.jpeg",
  "/uploads/0c64a4a1-0ee4-42f8-9502-7ecd37bc5e3a-1.jpeg",
];

const Home = () => {
  const [news, setNews] = useState<News[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch("/api/news").then(res => res.json()).then(data => setNews(data.slice(0, 5)));
    fetch("/api/awards").then(res => res.json()).then(data => setAwards(data.slice(0, 5)));
    fetch("/api/experiences").then(res => res.json()).then(data => setExperiences(data));
  }, []);

  return (
    <div className="space-y-32 pb-32">
      <AnimatedMarqueeHero
        tagline="Head of Dinas Komunikasi dan Informatika Kota Makassar"
        title={<>Dr. Muhammad Roem, S.STP., M.Si</>}
        description="Public servant passionate about digital communication, with 15+ years of experience leveraging technology to improve public services and drive innovation."
        ctaText="View More"
        images={DEMO_IMAGES}
      />
      <AboutUsSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-48">
        {/* About Me Section */}
        {/* <motion.section
          id="about"
          {...SECTION_ANIMATION}
          className="grid md:grid-cols-[1fr_1.5fr] gap-16 items-center"
        >
          <div className="relative group">
            <div className="aspect-square rounded-3xl overflow-hidden bg-brand-dark/5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
                alt="Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-primary rounded-2xl flex items-center justify-center text-brand-dark shadow-xl rotate-6 group-hover:rotate-0 transition-transform duration-500">
              <Sparkles size={48} />
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
                <User size={16} />
                <span>About Me</span>
              </div>
              <h2 className="text-5xl font-bold tracking-tight text-white leading-tight">
                An artisan of interfaces <br />
                based in the digital world.
              </h2>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
              With over a decade of experience, I specialize in creating seamless user journeys
              that marry beauty with functionality. I believe that every pixel should serve a
              purpose and every interaction should feel natural.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="font-bold text-white mb-1 italic">01. Strategy</h4>
                <p className="text-sm text-gray-400">Thinking beyond aesthetics to solve real business challenges.</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-1 italic">02. Execution</h4>
                <p className="text-sm text-gray-400">Turning complex ideas into polished, high-performance code.</p>
              </div>
            </div>
          </div>
        </motion.section> */}

        {/* Experience Section */}
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
              <h2 className="text-4xl font-bold tracking-tight text-white">Professional Experience</h2>
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
                className="group relative grid md:grid-cols-[200px_1fr] gap-4 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500"
              >
                <div className="text-brand-muted font-medium">{exp.period}</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">{exp.role} · {exp.company}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-2xl">{exp.description}</p>
                </div>
              </motion.div>
            ))}
            {experiences.length === 0 && (
              <p className="text-brand-muted italic">No experience entries yet. Add some in the admin panel.</p>
            )}
          </div>
        </motion.section>

        {/* News Section */}
        <motion.section
          id="news"
          {...SECTION_ANIMATION}
          className="space-y-16"
        >
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
                <Newspaper size={16} />
                <span>Updates</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-white">Latest News</h2>
            </div>
            <Link to="/news" className="group flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-brand-primary transition-colors">
              View all news <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col space-y-4"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-white/5 shadow-sm">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark px-2 py-0.5 rounded-full bg-brand-primary border border-brand-primary/20">{item.tag}</span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight group-hover:text-brand-primary transition-colors text-white">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Awards Section */}
        <motion.section
          id="awards"
          {...SECTION_ANIMATION}
          className="space-y-16"
        >
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm uppercase tracking-wider">
                <Trophy size={16} />
                <span>Recognition</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-white">Awards & Honors</h2>
            </div>
            <Link to="/awards" className="group flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-brand-primary transition-colors">
              View all awards <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid gap-4">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center justify-between p-6 rounded-2xl border border-white/5 hover:border-brand-primary hover:bg-white/[0.02] transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <span className="text-lg font-bold opacity-30 group-hover:opacity-100 text-brand-muted">{award.year}</span>
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-lg text-white group-hover:text-brand-primary transition-colors">{award.title}</h3>
                    <p className="text-sm opacity-60 group-hover:opacity-80 text-gray-400 group-hover:text-white transition-colors">{award.tag}</p>
                  </div>
                </div>
                <Trophy size={20} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand-primary" />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;

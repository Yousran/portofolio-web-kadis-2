import React, { useEffect, useState } from "react";
import { AnimatedMarqueeHero } from "../components/ui/hero-3";
import AboutUsSection from "../components/ui/about-me";
import ExperiencesSection from "../components/home/experiences-section";
import NewsSection from "../components/home/news-section";
import AwardsSection from "../components/home/awards-section";
import PartnersSection from "../components/home/partners-section";
import SocialsSection from "../components/home/socials-section";

interface News {
  id: number;
  title: string;
  tag: string;
  date: string;
  image: string;
  link: string;
}
interface Award {
  id: number;
  title: string;
  tag: string;
  year: string;
  image: string;
}
interface Partner {
  id: number;
  title: string;
  year: string;
  image: string;
}
interface Experience {
  id: number;
  period: string;
  role: string;
  company: string;
  description: string;
}

const DEMO_IMAGES = [
  "/uploads/images (1).jpg",
  "/uploads/9172fa2f-c2f9-407e-9a9b-7bbaec0bc560-1024x682.jpeg",
  "/uploads/makassar_689f1346703a7cd307e22d4540491ea3-720x405.jpg",
  "/uploads/83360f85-18ab-4fa3-a344-35d12bad0d5a.jpeg",
  "/uploads/0c64a4a1-0ee4-42f8-9502-7ecd37bc5e3a-1.jpeg",
  "/uploads/makassar_689f1346703a7cd307e22d4540491ea3-720x405.jpg",
];

export default function HomePage() {
  const [news, setNews] = useState<News[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    fetch("/api/home/news", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setNews(data));
    fetch("/api/home/awards", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setAwards(data));
    fetch("/api/home/partners", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setPartners(data));
    fetch("/api/experiences", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setExperiences(data));
  }, []);

  return (
    <div className="space-y-32 pb-32">
      <AnimatedMarqueeHero
        tagline="Head of Dinas Komunikasi dan Informatika Kota Makassar"
        title={<>Dr. Muhammad Roem, S.STP., M.Si</>}
        description={`Public servant passionate about digital communication, with ${new Date().getFullYear() - 2012}+ years of experience leveraging technology to improve public services and drive innovation.`}
        ctaText="View More"
        images={DEMO_IMAGES}
      />
      <AboutUsSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-48">
        <ExperiencesSection experiences={experiences} />
        <NewsSection news={news} />
        <AwardsSection awards={awards} />
        <PartnersSection partners={partners} />
        <SocialsSection />
      </div>
    </div>
  );
}

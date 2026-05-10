import { prisma } from "../src/lib/db.ts";

async function main() {
  console.log("Seeding data...");

  // News
  await prisma.news.createMany({
    data: [
      {
        title: "Launched the Aura Design System",
        tag: "Design",
        link: "#",
        date: "Oct 12, 2025",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
      },
      {
        title: "Future of AI in Frontend Development",
        tag: "Tech",
        link: "#",
        date: "Sep 28, 2025",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
      },
      {
        title: "Redesigning the Global Banking App",
        tag: "UI/UX",
        link: "#",
        date: "Aug 15, 2025",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
      },
    ],
  });

  // Awards
  await prisma.award.createMany({
    data: [
      {
        title: "Awwwards Site of the Year",
        tag: "Mobile Web",
        year: "2025",
        image: "https://images.unsplash.com/photo-1579546678181-9927bf99595e?auto=format&fit=crop&q=80&w=200",
      },
      {
        title: "Red Dot Design Award",
        tag: "Interface Design",
        year: "2024",
        image: "https://images.unsplash.com/photo-1579546678181-9927bf99595e?auto=format&fit=crop&q=80&w=200",
      },
      {
        title: "FWA of the Month",
        tag: "Creative Tech",
        year: "2023",
        image: "https://images.unsplash.com/photo-1579546678181-9927bf99595e?auto=format&fit=crop&q=80&w=200",
      },
    ],
  });

  // Experience
  await prisma.experience.createMany({
    data: [
      {
        period: "2023 - Present",
        role: "Senior Product Designer",
        company: "Google",
        description: "Leading the design of next-generation productivity tools for millions of users worldwide.",
      },
      {
        period: "2021 - 2023",
        role: "Frontend Engineer",
        company: "Stripe",
        description: "Architected and maintained the dashboard experience, ensuring high performance and accessibility.",
      },
      {
        period: "2019 - 2021",
        role: "UX Designer",
        company: "Airbnb",
        description: "Conceptualized and tested new features to improve user engagement and trust throughout the booking journey.",
      },
    ],
  });

  console.log("Seed finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

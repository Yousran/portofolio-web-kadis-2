import React from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Instagram,
  Music,
  Facebook,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/roemyorke/",
      label: "Instagram",
    },
    {
      icon: <Music size={20} />,
      href: "https://www.tiktok.com/@roemyorke",
      label: "TikTok",
    },
    {
      icon: <Twitter size={20} />,
      href: "https://x.com/roemyorke",
      label: "X",
    },
    {
      icon: <Facebook size={20} />,
      href: "https://www.facebook.com/roem.yorke.1/#",
      label: "Facebook",
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-brand-bg/20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-white"
            >
              Roemyorke
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Public servant passionate about digital communication, with{" "}
              {new Date().getFullYear() - 2012}+ years of experience leveraging
              technology to improve public services and drive innovation.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-brand-primary hover:bg-white/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:justify-items-end">
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-white">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/"
                    className="hover:text-brand-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="hover:text-brand-primary transition-colors"
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    to="/awards"
                    className="hover:text-brand-primary transition-colors"
                  >
                    Awards
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partners"
                    className="hover:text-brand-primary transition-colors"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-white">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-brand-primary transition-colors cursor-pointer">
                  Privacy Policy
                </li>
                <li className="hover:text-brand-primary transition-colors cursor-pointer">
                  Terms of Service
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} roemyorke.</p>
          <div className="flex items-center gap-1">
            {/* <span>Powered by</span>
            <span className="font-semibold text-brand-primary">Aura Design System</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "News", path: "/news" },
    { name: "Awards", path: "/awards" },
    { name: "Partners", path: "/partners" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/40 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold tracking-tight text-white">
            Roemyorke<span className="text-brand-primary">Portfolio</span>
          </Link>
          
          <div className="hidden sm:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-brand-primary",
                  location.pathname === item.path ? "text-brand-primary" : "text-gray-400"
                )}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-brand-primary"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

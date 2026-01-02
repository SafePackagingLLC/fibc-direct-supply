import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import NavLink from "./NavLink";

const Header = () => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  
  const navItems = [
    { label: "Industries We Serve", path: "/industries" },
    { label: "Build Your Bag", path: "/build-your-bag" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className={`border-b sticky top-0 z-50 ${
      isHomepage 
        ? "bg-background border-border" 
        : "bg-black border-black"
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-3 items-center">
          <NavLink 
            to="/" 
            className={`flex items-center gap-2 transition-colors ${
              isHomepage 
                ? "text-foreground hover:opacity-80" 
                : "text-white hover:text-primary"
            }`}
          >
            <Package className="h-8 w-8" />
            <div>
              <div className="text-xl font-bold">SAFE PACKAGING</div>
              <div className={`text-xs ${isHomepage ? "text-muted-foreground" : "text-white/70"}`}>
                Manufacturer of FIBC & PP Woven Bags
              </div>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center justify-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isHomepage
                    ? location.pathname === item.path 
                      ? "text-primary" 
                      : "text-foreground hover:text-primary"
                    : location.pathname === item.path
                      ? "text-primary"
                      : "text-white hover:text-primary"
                }`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex justify-end">
            <Button asChild>
              <NavLink to="/contact">Request a Quote</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
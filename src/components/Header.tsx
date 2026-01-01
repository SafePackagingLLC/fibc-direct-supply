import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const navItems = [
    { label: "Industries We Serve", path: "/industries" },
    { label: "Build Your Bag", path: "/build-your-bag" },
    { label: "Resources", path: "/resources" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className={`border-b sticky top-0 z-50 ${isHomePage ? "bg-background border-border" : "bg-secondary border-secondary"}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className={`flex items-center gap-2 transition-colors ${
              isHomePage 
                ? "text-foreground hover:opacity-80" 
                : "text-secondary-foreground hover:text-primary"
            }`}
          >
            <Package className="h-8 w-8" />
            <div>
              <div className="text-xl font-bold">SAFE PACKAGING</div>
              <div className={`text-xs ${isHomePage ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>
                Manufacturer of FIBCs
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isHomePage
                    ? location.pathname === item.path 
                      ? "text-primary" 
                      : "text-foreground hover:text-primary"
                    : location.pathname === item.path
                      ? "text-primary"
                      : "text-secondary-foreground hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button asChild>
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
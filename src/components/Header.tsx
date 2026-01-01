import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  const navItems = [
    { label: "Industries We Serve", path: "/industries" },
    { label: "Build Your Bag", path: "/build-your-bag" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className={`border-b sticky top-0 z-50 transition-colors ${
      isHomePage 
        ? "bg-background border-border" 
        : "bg-black border-black"
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${
            isHomePage ? "text-foreground" : "text-primary"
          }`}>
            <Package className="h-8 w-8" />
            <div>
              <div className="text-xl font-bold">SAFE PACKAGING</div>
              <div className={`text-xs ${isHomePage ? "text-muted-foreground" : "text-primary/70"}`}>Manufacturer of FIBCs</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  isHomePage
                    ? location.pathname === item.path ? "text-primary" : "text-foreground hover:text-primary"
                    : location.pathname === item.path ? "text-primary" : "text-primary/80 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button asChild className={isHomePage ? "" : "bg-primary text-primary-foreground hover:bg-primary/90"}>
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
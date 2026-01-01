import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  const navItems = [
    { label: "Industries We Serve", path: "/industries" },
    { label: "Build Your Bag", path: "/build-your-bag" },
    { label: "Resources", path: "/resources" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity">
            <Package className="h-8 w-8" />
            <div>
              <div className="text-xl font-bold">SAFE PACKAGING</div>
              <div className="text-xs text-muted-foreground">Manufacturer of FIBCs</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-foreground"
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
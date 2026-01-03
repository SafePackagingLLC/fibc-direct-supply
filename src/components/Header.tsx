import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, Menu } from "lucide-react";
import NavLink from "./NavLink";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
        <div className="flex items-center justify-between">
          {/* Logo */}
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
              <div className="text-lg sm:text-xl font-bold">SAFE PACKAGING</div>
              <div className={`text-xs hidden sm:block ${isHomepage ? "text-muted-foreground" : "text-white/70"}`}>
                Manufacturer of FIBC & PP Woven Bags
              </div>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
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

          {/* Right Side - CTA + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Request Quote Button - Hidden on mobile, shown on tablet+ */}
            <Button asChild className="hidden sm:inline-flex">
              <NavLink to="/contact">Request a Quote</NavLink>
            </Button>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`md:hidden ${isHomepage ? "" : "text-white hover:text-primary hover:bg-white/10"}`}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Package className="h-6 w-6" />
                    Safe Packaging
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${
                        location.pathname === item.path 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <Button asChild className="w-full" size="lg">
                      <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                        Request a Quote
                      </NavLink>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { Link } from "react-router-dom";
import { Package, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>1-800-SAFE-PKG</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>sales@safepackaging.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Manufacturing Drive<br />Industrial City, USA</span>
              </div>
              <Button size="sm" asChild className="mt-4">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <Link to="/products" className="block hover:text-primary transition-colors">Products</Link>
              <Link to="/industries" className="block hover:text-primary transition-colors">Industries</Link>
              <Link to="/resources" className="block hover:text-primary transition-colors">Resources</Link>
              <Link to="/about" className="block hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="block hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Warehouses */}
          <div>
            <h3 className="font-bold text-lg mb-4">Warehouses</h3>
            <div className="space-y-2 text-sm">
              <div>Phoenix, AZ</div>
              <div>Austin, TX</div>
              <div>Newark, NJ</div>
            </div>
          </div>

          {/* Legal & Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal & Resources</h3>
            <nav className="space-y-2 text-sm">
              <a href="#" className="block hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="block hover:text-primary transition-colors">Sitemap</a>
            </nav>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 text-center text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Package className="h-5 w-5" />
            <span className="font-semibold">Safe Packaging</span>
          </div>
          <p>© {new Date().getFullYear()} Safe Packaging — Manufacturer of FIBCs</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

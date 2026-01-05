import { Package, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavLink from "./NavLink";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="tel:1-602-730-2904" className="hover:text-primary transition-colors">
                  1-602-730-2904
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:Info@SafePackaging.org" className="hover:text-primary transition-colors break-all">
                  Info@SafePackaging.org
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Plot No. 08 Sector D-1, Phase-II<br />Karachi Export Processing Zone<br />Karachi - Pakistan</span>
              </div>
              <Button size="sm" asChild className="mt-4">
                <NavLink to="/contact">Contact us</NavLink>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <NavLink to="/build-your-bag" className="block hover:text-primary transition-colors">Build Your Bag</NavLink>
              <NavLink to="/industries" className="block hover:text-primary transition-colors">Industries</NavLink>
              <NavLink to="/contact" className="block hover:text-primary transition-colors">Contact</NavLink>
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

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <nav className="space-y-2 text-sm">
              <NavLink to="/privacy" className="block hover:text-primary transition-colors">Privacy Policy</NavLink>
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

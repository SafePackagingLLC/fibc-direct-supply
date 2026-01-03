import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavLink from "@/components/NavLink";
import { CheckCircle2, Factory, Zap, Settings, Wrench, Wheat, Beaker, HardHat, Apple, Pill, Recycle, Mountain, Sprout, Palette } from "lucide-react";
import heroImage from "@/assets/hero-warehouse.jpg";

const Index = () => {
  const industries = [
    { icon: Wheat, name: "Agriculture" },
    { icon: Beaker, name: "Chemicals" },
    { icon: HardHat, name: "Construction" },
    { icon: Apple, name: "Food Processing" },
    { icon: Pill, name: "Pharmaceuticals" },
    { icon: Recycle, name: "Recycling" },
    { icon: Mountain, name: "Minerals" },
    { icon: Sprout, name: "Fertilizers" },
    { icon: Palette, name: "Color Pigments" },
  ];


  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center text-secondary-foreground" aria-label="Hero">
        <div 
          className="absolute inset-0 bg-cover bg-right md:bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 border-primary text-primary bg-primary/10">
              Manufacturer since 1984
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Bulk Bags Manufactured & Stocked for 24-72 Hour Delivery
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-secondary-foreground/90">
              Factory-direct FIBCs, stocked in regional warehouses for 24–72 hour shipping. Custom sizes and liners available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-16 md:mt-0">
              <Button size="lg" asChild>
                <NavLink to="/industries">Industries we serve</NavLink>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-secondary-foreground text-foreground hover:bg-secondary-foreground hover:text-secondary">
                <NavLink to="/build-your-bag">Build Your Bag</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Made to Spec</h3>
              <p className="text-muted-foreground">Factory QA at every step — from raw materials to finished product</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Factory className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Factory Direct Pricing</h3>
              <p className="text-muted-foreground">No middleman — buy direct from the manufacturer and save</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Stocking</h3>
              <p className="text-muted-foreground">Regional warehouses for rapid delivery — 24 to 72 hours nationwide</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Full Customization</h3>
              <p className="text-muted-foreground">Custom sizes, liners, printing, colors, and special features available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Bulk Bags for Every Industry</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Build Your Bag Panel */}
            <div className="bg-muted p-8 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Settings className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Build Your Own Bag</h3>
              <p className="text-muted-foreground mb-6">
                Customize your FIBC bulk bag to match your capacity, liner, fabric, and loop needs.
              </p>
              <Button size="lg" asChild className="w-full sm:w-auto">
                <NavLink to="/build-your-bag">Start Customizing</NavLink>
              </Button>
              <div className="mt-8 space-y-2 text-sm text-muted-foreground">
                <p>• Standard FIBC</p>
                <p>• Food & Pharma grade</p>
                <p>• Custom solutions</p>
              </div>
            </div>

            {/* Right Side - Industries Grid */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">Industries We Serve</h3>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {industries.map((industry) => {
                  const Icon = industry.icon;
                  return (
                    <NavLink
                      key={industry.name}
                      to="/industries"
                      className="flex flex-col items-center justify-center py-4 px-3 sm:p-4 rounded-lg bg-muted hover:bg-primary/10 transition-colors min-h-[88px] sm:min-h-[100px]"
                    >
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2" />
                      <span className="text-xs sm:text-sm text-center">{industry.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Are you the manufacturer?</AccordionTrigger>
              <AccordionContent>
                Yes — Safe Packaging manufactures our FIBCs in-house with rigorous QA at every step, from raw material inspection to final product testing.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is the lead time for orders?</AccordionTrigger>
              <AccordionContent>
                If we have your required product in stock, lead time is typically 5–7 business days. For custom or out-of-stock configurations, lead times vary by order — contact us for a quote.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is the minimum order quantity?</AccordionTrigger>
              <AccordionContent>
                Our minimum order is typically 100–500 units depending on bag specifications. Contact us for specific MOQ details on your configuration.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I get samples before placing a bulk order?</AccordionTrigger>
              <AccordionContent>
                Yes — we offer paid samples so you can evaluate quality before committing to a larger order. Sample costs are typically credited toward your first bulk purchase.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>What customization options are available?</AccordionTrigger>
              <AccordionContent>
                We offer full customization including custom sizing, liner options, logo printing, fabric colors, and special features like dust-proof seams, UV resistance, and anti-static properties.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>How do I request a quote?</AccordionTrigger>
              <AccordionContent>
                Use our Build Your Bag tool to configure your specs, then submit a quote request. Or contact us directly — we typically respond within 1–2 business days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

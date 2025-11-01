import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ResourceCard from "@/components/ResourceCard";
import { CheckCircle2, Award, Zap, Settings } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import heroImage from "@/assets/hero-warehouse.jpg";
import productStandard from "@/assets/product-standard-fibc.jpg";
import productFoodGrade from "@/assets/product-food-grade.jpg";

const Index = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const products = [
    {
      title: "Standard FIBC",
      description: "General-purpose bulk bags for industrial applications",
      specs: "1,000-2,000 kg capacity • 150-200 GSM • Multiple liner options",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "standard-fibc"
    },
    {
      title: "Food & Pharma Grade",
      description: "FDA-compliant bags for food and pharmaceutical products",
      specs: "500-1,500 kg capacity • Food-safe liners • Full certification",
      image: productFoodGrade,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "food-pharma-fibc"
    }
  ];

  const resources = [
    {
      title: "What is an FIBC?",
      description: "A comprehensive introduction to Flexible Intermediate Bulk Containers and their applications.",
      slug: "what-is-fibc"
    },
    {
      title: "How to Choose an FIBC",
      description: "Expert guidance on selecting the right bulk bag for your specific material and industry.",
      slug: "choose-fibc"
    },
    {
      title: "Delivery & Logistics",
      description: "Learn how our local warehousing network enables rapid 24-72 hour delivery nationwide.",
      slug: "delivery-logistics"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center text-secondary-foreground">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="outline" className="mb-4 border-primary text-primary bg-primary/10">
            Manufacture since 1984
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            We Manufacture FIBCs — Stocked Locally for Fast Delivery
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-secondary-foreground/90">
            Factory-direct FIBCs, certified and stocked in regional warehouses for 24–72 hour shipping. Custom sizes and liners available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/industries">Industries we serve</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-secondary-foreground text-foreground hover:bg-secondary-foreground hover:text-secondary">
              <Link to="/products">View Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Made to Spec</h3>
              <p className="text-muted-foreground">Factory QA at every step — from raw materials to finished product</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Certifications & Test Reports</h3>
              <p className="text-muted-foreground">ISO certified • Food-grade • Electrostatic options available</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Stocking</h3>
              <p className="text-muted-foreground">Regional warehouses for rapid delivery — 24 to 72 hours nationwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Product Spec</h2>
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
                <Link to="/build-your-bag">Build Your Bag</Link>
              </Button>
              <div className="mt-8 space-y-2 text-sm text-muted-foreground">
                <p>• Standard FIBC</p>
                <p>• Medical-grade</p>
                <p>• Food & Pharma</p>
                <p>• Custom solutions</p>
              </div>
            </div>

            {/* Right Side - Product Carousel */}
            <div>
              <Carousel
                opts={{ loop: true }}
                plugins={[plugin.current]}
                className="w-full"
              >
                <CarouselContent>
                  {products.map((product) => (
                    <CarouselItem key={product.slug}>
                      <ProductCard {...product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              <div className="flex flex-wrap gap-2 mt-6 justify-center">
                <Badge variant="secondary">Agriculture</Badge>
                <Badge variant="secondary">Chemicals</Badge>
                <Badge variant="secondary">Mining</Badge>
                <Badge variant="secondary">Food & Pharma</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Center Preview */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">FIBC Knowledge Center</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical guides, spec sheets, and safety information from the manufacturer to help you choose the right bulk packaging solution.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {resources.map((resource) => (
              <ResourceCard key={resource.slug} {...resource} />
            ))}
          </div>
          <div className="text-center">
            <Button asChild variant="outline">
              <Link to="/resources">Browse All Resources</Link>
            </Button>
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
                Yes — Safe Packaging manufactures our FIBCs in-house and controls QA from raw material to finished product.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How quickly do you ship?</AccordionTrigger>
              <AccordionContent>
                Most in-stock items ship from regional warehouses within 24–72 hours. Custom orders: request a quote for lead time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I get test reports and certificates?</AccordionTrigger>
              <AccordionContent>
                Yes — test reports and certificates are available on request and downloadable from product spec pages.
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

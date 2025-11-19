import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Palette, ArrowLeft } from "lucide-react";
import productStandard from "@/assets/product-standard-fibc.jpg";

const ColorPigments = () => {
  const challenges = [
    {
      problem: "Cross-Contamination",
      solution: "Single-use food-grade liners and thorough cleaning protocols prevent color mixing between batches"
    },
    {
      problem: "Fine Particle Control",
      solution: "Tight-weave seamless construction contains ultra-fine pigment particles preventing dust and loss"
    },
    {
      problem: "Color Purity",
      solution: "Clean manufacturing environments and protective liners maintain pigment quality and color accuracy"
    },
    {
      problem: "Dust Containment",
      solution: "Sealed construction with dust-proof closures prevents airborne pigment particles in facilities"
    }
  ];

  const products = [
    {
      title: "Circular/Tubular FIBC",
      description: "Seamless design for fine pigment powders",
      specs: "500–1,500 kg capacity • 160–180 GSM • Seamless body • Tight weave • Minimizes dust leakage",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "circular-pigment-fibc"
    },
    {
      title: "Lined FIBC Bag",
      description: "Maximum protection for color purity",
      specs: "500–1,000 kg capacity • 160–180 GSM • Food-grade PE liner • Contamination prevention • Sealed construction",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "lined-pigment-fibc"
    }
  ];

  const features = [
    "Food-grade liner options",
    "Seamless construction",
    "Ultra-tight weave fabric",
    "Dust-proof closures",
    "Contamination prevention",
    "Single-use or cleanable designs",
    "Custom printing with food-safe inks",
    "Optimized for ultra-fine powders"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6 -ml-4">
            <Link to="/industries" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Industries
            </Link>
          </Button>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Palette className="h-10 w-10 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
              <h1 className="text-4xl md:text-5xl font-bold">Color Pigments</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            Specialized bulk bags for industrial pigments, paint powders, dyes, and color additives. Prevent cross-contamination and maintain color purity with sealed, tight-weave construction.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link to="/build-your-bag">Build Custom Bag</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Common Challenges We Solve</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2 text-primary">{item.problem}</h3>
                  <p className="text-muted-foreground">{item.solution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Recommended Products for Color Pigments</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These specialized bags prevent contamination and maintain color purity for pigment applications.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features for Pigment Applications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Pigment-Safe Bulk Bags?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get contamination-free bulk bags designed specifically for color pigments and fine powder applications.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Request a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/build-your-bag">Build Custom Bag</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ColorPigments;
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Mountain, ArrowLeft } from "lucide-react";
import productStandard from "@/assets/product-standard-fibc.jpg";

const Minerals = () => {
  const challenges = [
    {
      problem: "Abrasive Material Damage",
      solution: "Heavy-duty fabric with reinforced construction withstands sharp mineral ores and metal powders"
    },
    {
      problem: "Extreme Weight Loads",
      solution: "High GSM fabric (200-240 GSM) and 6:1 safety factors handle dense mineral loads safely"
    },
    {
      problem: "Dust Control",
      solution: "Seamless tubular designs and dust-proof closures minimize mineral powder leakage during transport"
    },
    {
      problem: "Transportation Efficiency",
      solution: "Optimized designs maximize load capacity while maintaining structural integrity for long hauls"
    }
  ];

  const products = [
    {
      title: "Heavy-Duty FIBC Bag",
      description: "Extra strength for abrasive mineral loads",
      specs: "1,000–2,000 kg capacity • 200–240 GSM • High GSM fabric • Reinforced loops • Abrasion resistant",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "heavy-duty-minerals-fibc"
    },
    {
      title: "Circular/Tubular FIBC",
      description: "Seamless design for fine mineral powders",
      specs: "1,000–2,000 kg capacity • 180–200 GSM • Seamless body • Ideal for fine mineral powders • Reduced leakage",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "circular-minerals-fibc"
    },
    {
      title: "Baffle FIBC Bag",
      description: "Optimized storage for mineral concentrates",
      specs: "1,000–1,500 kg capacity • 200–220 GSM • Internal baffles • Cubic shape • Optimized storage",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "baffle-minerals-fibc"
    }
  ];

  const features = [
    "Heavy-duty 200-240 GSM fabric",
    "Abrasion-resistant construction",
    "6:1 safety factor for heavy loads",
    "Reinforced lifting loops",
    "Seamless options for fine powders",
    "Dust-proof closure systems",
    "UV stabilization",
    "Custom sizes for specific minerals"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Split Layout with Image on Right */}
      <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6 -ml-4">
            <Link to="/industries" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Industries
            </Link>
          </Button>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Mountain className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Minerals</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                Extra-strength bulk bags engineered for mineral ores, coal, metal powders, and industrial minerals. Built to handle abrasive materials and extreme weight loads with maximum safety.
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
            
            {/* Right Image */}
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <img 
                src={productStandard} 
                alt="Mineral bulk bags" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Industry Challenges Section */}
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

      {/* Products Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Recommended Products for Minerals</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These heavy-duty bulk bags are specifically designed for the demanding requirements of mineral handling.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features for Mineral Applications</h2>
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

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Heavy-Duty Mineral Bags?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get extra-strength bulk bags designed for the toughest mineral handling applications. Fast delivery from regional warehouses.
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

export default Minerals;
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, HardHat, ArrowLeft } from "lucide-react";
import productStandard from "@/assets/product-standard-fibc.jpg";

const Construction = () => {
  const challenges = [
    {
      problem: "Heavy Load Requirements",
      solution: "High GSM fabric (200-240 GSM) with reinforced lifting loops handles cement, sand, and aggregate loads safely"
    },
    {
      problem: "Abrasive Materials",
      solution: "Heavy-duty construction and abrasion-resistant fabric withstands rough handling of sharp aggregates"
    },
    {
      problem: "Fine Powder & Dust Control",
      solution: "Seamless tubular designs and dust-proof closures minimize cement and fly ash dust during transport"
    },
    {
      problem: "Outdoor Storage",
      solution: "UV-stabilized materials protect contents during extended outdoor storage at construction sites"
    },
    {
      problem: "Storage Efficiency",
      solution: "Baffle bags maintain cubic shape for optimized warehouse space utilization and stable pallet stacking"
    },
    {
      problem: "Moisture Protection",
      solution: "Optional PE liners protect cement from humidity that can cause premature hydration"
    }
  ];

  const products = [
    {
      title: "Standard Construction FIBC",
      description: "Durable bags for heavy construction materials",
      specs: "1,000–2,000 kg capacity • 180–220 GSM • Heavy-duty fabric • 4 corner loops • UV stabilized",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "standard-construction-fibc"
    },
    {
      title: "Circular/Tubular FIBC",
      description: "Seamless design for cement and fine materials",
      specs: "1,000–2,000 kg capacity • 180–200 GSM • Seamless body • Ideal for cement & fine powders • Reduced rupture risk",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "circular-tubular-fibc"
    },
    {
      title: "Baffle FIBC Bag",
      description: "Optimized for cement, fly ash, and aggregate storage",
      specs: "1,000–1,500 kg capacity • 200–220 GSM • Internal baffles • Cubic shape • Optimized for cement & aggregates",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "baffle-construction-fibc"
    }
  ];

  const features = [
    "Heavy-duty 180-240 GSM fabric",
    "UV stabilization for outdoor use",
    "Reinforced lifting loops",
    "Dust-proof closure options",
    "6:1 safety factor for heavy loads",
    "Abrasion-resistant construction",
    "Seamless designs for fine powders",
    "PE liners for moisture protection",
    "Custom sizes for specific materials",
    "Weather-resistant materials",
    "Ideal for cement, sand, gravel, aggregates",
    "Optimized for fly ash and lime"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section - Style B: Split Layout with Image on Right */}
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
                  <HardHat className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Construction & Cement</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                Heavy-duty bulk bags engineered for demanding construction environments. Designed to handle cement, Portland cement, fly ash, lime, gypsum, sand, gravel, and aggregates with maximum durability and dust control.
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
                alt="Construction bulk bags" 
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <h2 className="text-3xl font-bold mb-4 text-center">Recommended Products for Construction & Cement</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These bulk bag solutions are built for the tough demands of construction sites and cement applications. All products are in stock and ready to ship.
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
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features for Construction & Cement Applications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <h2 className="text-3xl font-bold mb-4">Ready for Your Construction Project?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get heavy-duty bulk bags delivered to your construction site. Fast shipping from regional warehouses.
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

export default Construction;
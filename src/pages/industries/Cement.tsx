import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Building2, ArrowLeft } from "lucide-react";
import productStandard from "@/assets/product-standard-fibc.jpg";

const Cement = () => {
  const challenges = [
    {
      problem: "Fine Powder Leakage",
      solution: "Seamless tubular construction and tight-weave fabric minimize cement dust escaping during transport"
    },
    {
      problem: "Dust Control",
      solution: "Dust-proof closures and PE liners contain fine cement particles preventing workplace hazards"
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
      title: "Circular/Tubular FIBC",
      description: "Seamless design minimizes dust leakage",
      specs: "1,000–2,000 kg capacity • 180–200 GSM • Seamless body • Ideal for cement & pigments • Minimizes dust leakage",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "circular-cement-fibc"
    },
    {
      title: "Baffle FIBC Bag",
      description: "Optimal stacking for cement and pigment storage",
      specs: "1,000–1,500 kg capacity • 200–220 GSM • Internal baffles • Cubic shape • Optimized for fine powders",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "baffle-cement-fibc"
    }
  ];

  const features = [
    "Seamless tubular construction",
    "Dust minimization design",
    "Baffle options for cubic shape",
    "PE liners for moisture protection",
    "High tensile strength fabric",
    "UV stabilization",
    "Custom printing available",
    "Optimized for fine powders"
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
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
              <h1 className="text-4xl md:text-5xl font-bold">Cement</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            Specialized bulk bags for Portland cement, fly ash, lime, and gypsum. Seamless tubular designs minimize dust leakage and protect fine powders during transport and storage.
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
          <h2 className="text-3xl font-bold mb-4 text-center">Recommended Products for Cement</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These specialized bags are designed to contain fine cement powders and minimize dust during handling.
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
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features for Cement Applications</h2>
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
          <h2 className="text-3xl font-bold mb-4">Need Cement Bulk Bags?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get dust-controlled bulk bags specifically designed for cement and fine powder applications.
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

export default Cement;

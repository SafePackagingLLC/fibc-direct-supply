import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Wheat, ArrowLeft } from "lucide-react";
import productStandard from "@/assets/product-standard-fibc.jpg";

const Agriculture = () => {
  const challenges = [
    {
      problem: "Moisture Damage",
      solution: "UV-stabilized bags with optional PE liners protect against moisture and extend product shelf life"
    },
    {
      problem: "Product Contamination",
      solution: "Food-grade materials and cleanroom manufacturing ensure your agricultural products stay pure"
    },
    {
      problem: "Storage Efficiency",
      solution: "Baffle bags maintain cubic shape for optimized warehouse space and stable stacking"
    },
    {
      problem: "Transportation Costs",
      solution: "Lightweight yet durable construction reduces shipping costs while maintaining load integrity"
    }
  ];

  const products = [
    {
      title: "Standard FIBC Bag",
      description: "General-purpose bulk bags for agricultural products",
      specs: "1,000–2,000 kg capacity • 160–200 GSM • 4 lifting loops • UV stabilized • Optional PE liner",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "standard-fibc"
    },
    {
      title: "Ventilated FIBC Bag",
      description: "Enhanced airflow for perishable agricultural products",
      specs: "500–1,000 kg capacity • 160–180 GSM • Ventilation strips • 4 lifting loops • Enhanced airflow",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "ventilated-fibc"
    },
    {
      title: "Baffle FIBC Bag",
      description: "Stackable bags maintaining cubic shape for efficient storage",
      specs: "1,000–1,500 kg capacity • 180–200 GSM • Internal baffles • Maintains cubic shape • Optimized stacking",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "baffle-fibc"
    }
  ];

  const features = [
    "UV protection for outdoor storage",
    "Food-safe materials available",
    "Moisture-resistant liners",
    "Dust-proof closures",
    "5:1 or 6:1 safety factor",
    "Customizable printing"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
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
              <Wheat className="h-10 w-10 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
              <h1 className="text-4xl md:text-5xl font-bold">Agriculture</h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            Bulk packaging solutions designed specifically for agricultural products including grains, seeds, fertilizers, and animal feed. Our bags protect your products from moisture, contamination, and UV damage.
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
          <h2 className="text-3xl font-bold mb-4 text-center">Recommended Products for Agriculture</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These bulk bag solutions are specifically designed for agricultural applications. All products are in stock and ready to ship within 24-72 hours.
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
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features for Agricultural Applications</h2>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get factory-direct pricing and fast delivery from our regional warehouses. Custom specifications available.
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

export default Agriculture;
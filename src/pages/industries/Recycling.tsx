import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Recycle, ArrowLeft } from "lucide-react";
import productStandard from "@/assets/product-standard-fibc.jpg";

const Recycling = () => {
  const challenges = [
    {
      problem: "Mixed Material Handling",
      solution: "Versatile bag designs accommodate various recyclable materials from plastics to metals to paper"
    },
    {
      problem: "Reusability Requirements",
      solution: "Durable construction allows multiple uses, reducing waste and operational costs"
    },
    {
      problem: "Cost Efficiency",
      solution: "Economical bulk bag solutions that balance durability with affordability for recycling operations"
    },
    {
      problem: "Contamination Control",
      solution: "Easy-to-clean designs and appropriate liners prevent cross-contamination between material types"
    }
  ];

  const products = [
    {
      title: "Standard FIBC Bag",
      description: "Versatile bags for recycling operations",
      specs: "500–1,500 kg capacity • 160–180 GSM • 4 corner loops • Durable construction • Reusable",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "standard-recycling-fibc"
    },
    {
      title: "Ventilated FIBC Bag",
      description: "Airflow for organic waste recycling",
      specs: "500–1,000 kg capacity • 160–180 GSM • Ventilation strips • Airflow for organic materials • 4 lifting loops",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "ventilated-recycling-fibc"
    }
  ];

  const features = [
    "Durable, reusable construction",
    "Cost-effective solution",
    "Easy to clean between uses",
    "Multiple capacity options",
    "Standard or ventilated designs",
    "Color-coding available",
    "UV stabilization",
    "Customizable for specific materials"
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
                  <Recycle className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Recycling</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                Durable and reusable bulk bags designed for recycling operations. Handle plastic, paper, metal, and organic recyclables with cost-effective, long-lasting solutions.
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
                alt="Recycling bulk bags" 
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
          <h2 className="text-3xl font-bold mb-4 text-center">Recommended Products for Recycling</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These durable bulk bags are designed for multiple uses in recycling operations.
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
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features for Recycling Applications</h2>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Recycling Operation?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get cost-effective, reusable bulk bags that reduce waste and improve efficiency in your recycling facility.
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

export default Recycling;
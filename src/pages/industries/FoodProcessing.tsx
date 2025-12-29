import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Apple, ArrowLeft } from "lucide-react";
import productFoodGrade from "@/assets/product-food-grade.jpg";
import industryFoodProcessing from "@/assets/industry-food-processing.jpg";

const FoodProcessing = () => {
  const challenges = [
    {
      problem: "Contamination Prevention",
      solution: "Cleanroom manufacturing and food-grade materials ensure zero contamination risk during transport"
    },
    {
      problem: "FDA Compliance",
      solution: "FDA-compliant materials and manufacturing processes meet all regulatory requirements for food contact"
    },
    {
      problem: "Hygiene Standards",
      solution: "Sealed construction and food-safe PE liners maintain product purity from manufacturing to delivery"
    },
    {
      problem: "Traceability Requirements",
      solution: "Lot tracking and detailed documentation ensure full traceability for food safety compliance"
    }
  ];

  const products = [
    {
      title: "Food-Grade FIBC Bag",
      description: "Hygienic bulk storage for food products",
      specs: "500–1,500 kg capacity • 160–180 GSM • FDA-compliant • Cleanroom manufactured • Food-safe PE liner",
      image: productFoodGrade,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "food-grade-fibc"
    },
    {
      title: "Baffle Food-Grade FIBC",
      description: "Stackable food-safe bags with cubic shape",
      specs: "1,000–1,500 kg capacity • 180–200 GSM • Internal baffles • Food-grade liner • Cubic shape for stacking",
      image: productFoodGrade,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "baffle-food-grade-fibc"
    }
  ];

  const features = [
    "FDA-compliant materials",
    "Cleanroom manufactured",
    "Food-safe PE liners",
    "BRC certification available",
    "Lot tracking and traceability",
    "Sealed construction prevents contamination",
    "HACCP compliant processes",
    "Custom printing with food-safe inks"
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
                  <Apple className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Food Processing</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                FDA-compliant bulk bags manufactured in cleanroom facilities for safe transport of food ingredients, flour, sugar, starches, and bulk food powders. Maintaining purity and meeting hygiene standards.
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
                src={industryFoodProcessing} 
                alt="Food-grade bulk bags" 
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
          <h2 className="text-3xl font-bold mb-4 text-center">Recommended Products for Food Processing</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These food-grade bulk bags are manufactured in cleanroom facilities and meet all FDA requirements for food contact.
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
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features for Food Processing Applications</h2>
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
          <h2 className="text-3xl font-bold mb-4">Need Food-Grade Bulk Bags?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get FDA-compliant bags manufactured to the highest hygiene standards. Full traceability and documentation included.
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

export default FoodProcessing;
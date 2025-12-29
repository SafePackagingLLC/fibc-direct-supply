import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Sprout, ArrowLeft } from "lucide-react";
import productStandard from "@/assets/product-standard-fibc.jpg";
import industryFertilizers from "@/assets/industry-fertilizers.jpg";

const Fertilizers = () => {
  const challenges = [
    {
      problem: "Moisture Sensitivity",
      solution: "PE liners and moisture barriers protect hygroscopic fertilizers from humidity during storage and transport"
    },
    {
      problem: "Chemical Reactions",
      solution: "Chemical-resistant materials prevent unwanted reactions and maintain fertilizer efficacy"
    },
    {
      problem: "Hygroscopic Materials",
      solution: "Sealed construction with appropriate liners prevents moisture absorption in urea and other hygroscopic fertilizers"
    },
    {
      problem: "Corrosion Risk",
      solution: "Corrosion-resistant materials and protective liners prevent degradation from acidic or alkaline fertilizers"
    }
  ];

  const products = [
    {
      title: "Standard FIBC Bag",
      description: "Reliable bulk storage for fertilizer products",
      specs: "1,000–1,500 kg capacity • 160–200 GSM • UV stabilized • 4 corner loops • Optional PE liner",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "standard-fertilizer-fibc"
    },
    {
      title: "Lined FIBC Bag",
      description: "Maximum moisture protection for hygroscopic fertilizers",
      specs: "500–1,500 kg capacity • 160–180 GSM • PE liner • Moisture protection • Ideal for hygroscopic fertilizers",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "lined-fertilizer-fibc"
    }
  ];

  const features = [
    "Moisture-resistant PE liners",
    "UV stabilization for outdoor storage",
    "Chemical-resistant materials",
    "Dust-proof closures",
    "Custom capacity options",
    "Corrosion-resistant construction",
    "Optional ventilation",
    "Custom printing available"
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
                  <Sprout className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Fertilizers</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                Moisture-resistant bulk bags designed for NPK fertilizers, urea, potash, and organic fertilizers. Protect hygroscopic materials from moisture with appropriate liners and sealed construction.
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
                src={industryFertilizers} 
                alt="Fertilizer bulk bags" 
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
          <h2 className="text-3xl font-bold mb-4 text-center">Recommended Products for Fertilizers</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These bulk bags provide excellent moisture protection for all types of fertilizer products.
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
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features for Fertilizer Applications</h2>
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
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Fertilizers?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get moisture-resistant bulk bags that keep your fertilizer products dry and effective during storage and transport.
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

export default Fertilizers;
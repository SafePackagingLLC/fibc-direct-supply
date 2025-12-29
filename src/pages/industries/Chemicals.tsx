import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Beaker, ArrowLeft } from "lucide-react";
import productStandard from "@/assets/product-standard-fibc.jpg";
import industryChemicals from "@/assets/industry-chemicals.jpg";

const Chemicals = () => {
  const challenges = [
    {
      problem: "Static Discharge Risks",
      solution: "Type B, C, and D antistatic bags prevent dangerous spark discharges when handling flammable powders"
    },
    {
      problem: "Hazardous Material Safety",
      solution: "Specialized bags with proper certifications ensure safe handling of reactive and toxic chemicals"
    },
    {
      problem: "Regulatory Compliance",
      solution: "UN-certified bags meet international standards for hazardous material transport and storage"
    },
    {
      problem: "Chemical Compatibility",
      solution: "Chemical-resistant liners and coatings prevent reactions and contamination during transport"
    }
  ];

  const products = [
    {
      title: "Type B Antistatic FIBC",
      description: "Prevents spark discharges for flammable powders",
      specs: "500–1,500 kg capacity • 180–200 GSM • Low breakdown voltage • Prevents spark discharges • 4 lifting loops",
      image: productStandard,
      stockStatus: "Contact for availability",
      slug: "type-b-antistatic-fibc"
    },
    {
      title: "Type C Conductive FIBC",
      description: "Safe handling of flammable chemicals with grounding",
      specs: "1,000–1,500 kg capacity • 200–220 GSM • Conductive threads • Requires grounding • Flammable powder safe",
      image: productStandard,
      stockStatus: "Contact for availability",
      slug: "type-c-conductive-fibc"
    },
    {
      title: "Type D Static Dissipative FIBC",
      description: "Static dissipation without grounding requirements",
      specs: "500–1,500 kg capacity • 180–200 GSM • No grounding required • Static dissipative • Safe for hazardous environments",
      image: productStandard,
      stockStatus: "Contact for availability",
      slug: "type-d-static-dissipative-fibc"
    }
  ];

  const features = [
    "Type B, C, and D antistatic options",
    "UN certification for hazardous materials",
    "Chemical-resistant liners available",
    "Grounding options for Type C bags",
    "FDA-approved materials for certain applications",
    "Custom printing with hazard symbols",
    "5:1 or 6:1 safety factor",
    "Seamless construction to prevent leaks"
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
                  <Beaker className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Chemicals</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-8">
                Specialized bulk bags engineered for safe handling of chemical powders, resins, and industrial compounds. Our antistatic options prevent dangerous static discharge when working with flammable materials.
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
                src={industryChemicals} 
                alt="Chemical bulk bags" 
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
          <h2 className="text-3xl font-bold mb-4 text-center">Recommended Products for Chemicals</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            These specialized bulk bags are designed for safe chemical handling with proper antistatic protection and certifications.
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
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features for Chemical Applications</h2>
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
          <h2 className="text-3xl font-bold mb-4">Need Chemical-Safe Bulk Bags?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Contact our team to discuss your specific chemical handling requirements and safety certifications.
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

export default Chemicals;
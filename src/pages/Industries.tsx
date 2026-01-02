import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/NavLink";
import { 
  Wheat, 
  Beaker, 
  HardHat, 
  Apple, 
  Pill, 
  Recycle, 
  Mountain, 
  Sprout,
  Palette
} from "lucide-react";
import heroWarehouse from "@/assets/hero-Industries.jpg";

const Industries = () => {
  const industries = [
    {
      icon: Wheat,
      title: "Agriculture",
      description: "Specialized bulk bags for grains, seeds, fertilizers, and feed with moisture protection and UV resistance.",
      applications: ["Grain storage", "Fertilizer transport", "Seed packaging", "Animal feed"],
      slug: "agriculture"
    },
    {
      icon: Beaker,
      title: "Chemicals",
      description: "Safe handling solutions for chemical powders with Type B, C, and D antistatic options for hazardous materials.",
      applications: ["Chemical powders", "Resins", "Industrial compounds", "Hazardous materials"],
      slug: "chemicals"
    },
    {
      icon: HardHat,
      title: "Construction & Cement",
      description: "Heavy-duty bags for cement, Portland cement, fly ash, sand, gravel, and aggregates for construction sites.",
      applications: ["Cement & concrete", "Sand & gravel", "Aggregates", "Fly ash", "Lime & gypsum"],
      slug: "construction"
    },
    {
      icon: Apple,
      title: "Food Processing",
      description: "FDA-compliant, food-grade bags manufactured in cleanroom facilities for safe ingredient transport.",
      applications: ["Flour & sugar", "Starches", "Food ingredients", "Bulk powders"],
      slug: "food-processing"
    },
    {
      icon: Pill,
      title: "Pharmaceuticals",
      description: "GMP-compliant pharmaceutical-grade bags for APIs and excipients with contamination-free transport.",
      applications: ["Active ingredients", "Excipients", "Pharmaceutical powders", "Supplements"],
      slug: "pharmaceuticals"
    },
    {
      icon: Recycle,
      title: "Recycling",
      description: "Durable, reusable solutions for recyclable materials and waste management operations.",
      applications: ["Plastic recycling", "Paper & cardboard", "Metal scrap", "Organic waste"],
      slug: "recycling"
    },
    {
      icon: Mountain,
      title: "Minerals",
      description: "Extra-strength bags for ores, coal, and mineral powders with abrasion-resistant construction.",
      applications: ["Mineral ores", "Coal", "Metal powders", "Industrial minerals"],
      slug: "minerals"
    },
    {
      icon: Sprout,
      title: "Fertilizers",
      description: "Moisture-resistant bags with optional liners for granular and powdered fertilizer products.",
      applications: ["NPK fertilizers", "Urea", "Potash", "Organic fertilizers"],
      slug: "fertilizers"
    },
    {
      icon: Palette,
      title: "Color Pigments",
      description: "Specialized bags for fine pigment powders with dust containment and contamination prevention.",
      applications: ["Industrial pigments", "Paint powders", "Dyes", "Color additives"],
      slug: "color-pigments"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroWarehouse})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Industries We Serve
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Specialized FIBC solutions for diverse industries—we deliver exactly what you need.
            </p>
            <Button size="lg" asChild>
              <NavLink to="/build-your-bag">Build Custom Bag for Your Industry</NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <Card key={industry.slug} className="h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{industry.title}</h2>
                        <p className="text-muted-foreground text-sm">{industry.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2 text-sm">Common Applications:</h3>
                    <ul className="grid grid-cols-1 gap-1">
                      {industry.applications.map((app) => (
                        <li key={app} className="text-sm text-muted-foreground">
                          • {app}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See Your Industry?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We work with many specialized industries. Contact us to discuss your specific bulk bag requirements.
          </p>
          <Button size="lg" asChild>
            <NavLink to="/contact">Contact Our Team</NavLink>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industries;
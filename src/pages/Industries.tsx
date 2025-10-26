import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Wheat, Beaker, Mountain, Pill } from "lucide-react";

const Industries = () => {
  const industries = [
    {
      icon: Wheat,
      title: "Agriculture",
      description: "Bulk bags for grains, seeds, fertilizers, and agricultural products. Moisture-resistant options available.",
      applications: ["Grain storage", "Fertilizer transport", "Seed packaging", "Animal feed"]
    },
    {
      icon: Beaker,
      title: "Chemicals",
      description: "Safe handling of chemical powders and granules with appropriate liner and safety certifications.",
      applications: ["Chemical powders", "Resins", "Pigments", "Industrial compounds"]
    },
    {
      icon: Mountain,
      title: "Mining",
      description: "Heavy-duty bags for minerals, aggregates, and mining materials with high safety factors.",
      applications: ["Mineral ores", "Sand & aggregates", "Metal powders", "Industrial minerals"]
    },
    {
      icon: Pill,
      title: "Food & Pharma",
      description: "FDA-compliant bags with food-grade liners for pharmaceutical and food industry applications.",
      applications: ["Food ingredients", "Pharmaceutical powders", "Nutritional supplements", "Sugar & salt"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Industries We Serve</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Safe Packaging provides specialized FIBC solutions for diverse industries, each with unique requirements and certifications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <Card key={industry.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{industry.title}</h2>
                        <p className="text-muted-foreground">{industry.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">Common Applications:</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {industry.applications.map((app) => (
                        <li key={app} className="text-sm text-muted-foreground">• {app}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industries;

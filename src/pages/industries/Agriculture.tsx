import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wheat, ArrowLeft, Sprout, Dog, Apple, CheckCircle2 } from "lucide-react";
import industryAgriculture from "@/assets/industry-agriculture.jpg";
import productStandard from "@/assets/product-standard-fibc.jpg";

const Agriculture = () => {
  const sectors = [
    {
      id: "grains",
      name: "Grains",
      icon: Wheat,
      headline: "Bulk Bags for Grain Storage & Transport",
      description: "Store and transport wheat, corn, rice, barley, oats, and other cereal grains with confidence. Our grain bags are built for outdoor storage and high-volume handling.",
      bagType: "Standard FIBC",
      features: [
        "UV-stabilized fabric for outdoor storage",
        "Dust-proof top closures",
        "Reinforced lifting loops for repeated use",
        "Food-grade options available"
      ],
      specs: {
        capacity: "1,500–2,000 kg",
        dimensions: "35\" x 35\" x 45\" or 35\" x 35\" x 50\"",
        material: "Woven polypropylene (160–200 GSM)"
      },
      image: productStandard,
      color: {
        bg: "bg-amber-50",
        iconBg: "bg-amber-500",
        accent: "text-amber-600",
        border: "border-amber-200",
        tableBg: "bg-amber-100"
      }
    },
    {
      id: "seeds",
      name: "Seeds",
      icon: Sprout,
      headline: "Ventilated Bags for Seed Viability",
      description: "Maintain seed viability with breathable bulk bags designed for airflow. Perfect for planting seeds, vegetable seeds, and seed stock that need moisture control.",
      bagType: "Ventilated FIBC",
      features: [
        "Breathable fabric prevents moisture buildup",
        "Maintains seed germination rates",
        "Lightweight for easier handling",
        "Optional inner liners for fine seeds"
      ],
      specs: {
        capacity: "1,000–1,250 kg",
        dimensions: "35\" x 35\" x 35\" or 35\" x 35\" x 42\"",
        material: "Ventilated woven polypropylene"
      },
      image: productStandard,
      color: {
        bg: "bg-emerald-50",
        iconBg: "bg-emerald-500",
        accent: "text-emerald-600",
        border: "border-emerald-200",
        tableBg: "bg-emerald-100"
      }
    },
    {
      id: "feed",
      name: "Animal Feed",
      icon: Dog,
      headline: "Food-Grade Bags for Feed Products",
      description: "Safe, certified bulk bags for livestock feed, pet food ingredients, and feed supplements. Manufactured in clean facilities to prevent contamination.",
      bagType: "Food-Grade FIBC",
      features: [
        "Food-grade certified materials",
        "Clean-room manufacturing",
        "Contamination-free guarantee",
        "Full traceability documentation"
      ],
      specs: {
        capacity: "1,000–1,500 kg",
        dimensions: "35\" x 35\" x 40\" or 35\" x 35\" x 45\"",
        material: "Food-grade woven polypropylene"
      },
      image: productStandard,
      color: {
        bg: "bg-sky-50",
        iconBg: "bg-sky-500",
        accent: "text-sky-600",
        border: "border-sky-200",
        tableBg: "bg-sky-100"
      }
    },
    {
      id: "produce",
      name: "Fresh Produce",
      icon: Apple,
      headline: "Ventilated Bags for Root Vegetables & Produce",
      description: "Extend shelf life for potatoes, onions, carrots, and other bulk produce. Open-weave construction provides maximum airflow to prevent spoilage.",
      bagType: "Ventilated FIBC",
      features: [
        "Maximum airflow design",
        "Gentle on produce surfaces",
        "Reduces spoilage and waste",
        "Easy filling and discharge"
      ],
      specs: {
        capacity: "800–1,000 kg",
        dimensions: "35\" x 35\" x 40\" or 37\" x 37\" x 45\"",
        material: "Open-weave polypropylene"
      },
      image: productStandard,
      color: {
        bg: "bg-rose-50",
        iconBg: "bg-rose-500",
        accent: "text-rose-600",
        border: "border-rose-200",
        tableBg: "bg-rose-100"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-4 -ml-4">
            <Link to="/industries" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Industries
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Wheat className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Agriculture</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Bulk bags engineered for agricultural products—from grains and seeds to animal feed and fresh produce. Scroll to find the right solution for what you're storing.
              </p>

              {/* Quick Nav */}
              <div className="flex flex-wrap gap-2 mb-6">
                {sectors.map((sector) => {
                  const Icon = sector.icon;
                  return (
                    <a
                      key={sector.id}
                      href={`#${sector.id}`}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${sector.color.border} ${sector.color.bg} hover:shadow-md transition-all text-sm font-medium`}
                    >
                      <Icon className={`h-4 w-4 ${sector.color.accent}`} />
                      {sector.name}
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/contact">Request a Quote</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/build-your-bag">Build Custom Bag</Link>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[350px] rounded-lg overflow-hidden shadow-xl">
              <img
                src={industryAgriculture}
                alt="Agricultural bulk bags in use"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Transition from hero to first section */}
      <div className={`h-16 bg-gradient-to-b from-background ${sectors[0].color.bg.replace('bg-', 'to-')}`} />

      {/* Sector Sections */}
      {sectors.map((sector, index) => {
        const Icon = sector.icon;

        return (
          <section
            key={sector.id}
            id={sector.id}
            className="relative"
          >
            {/* Gradient transition from previous section */}
            {index > 0 && (
              <div className={`h-24 bg-gradient-to-b ${sectors[index - 1].color.bg.replace('bg-', 'from-')} ${sector.color.bg.replace('bg-', 'to-')}`} />
            )}

            {/* Main Section Content */}
            <div className={`${sector.color.bg} py-16`}>
              <div className="container mx-auto px-4">
                {/* Section Header - More Prominent */}
                <div className="mb-12">
                  <div className="flex items-center gap-5 mb-4">
                    <div className={`p-5 rounded-2xl ${sector.color.iconBg} text-white shadow-xl`}>
                      <Icon className="h-12 w-12" />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold uppercase tracking-wider ${sector.color.accent} mb-1`}>Agricultural Solutions</p>
                      <h2 className="text-4xl md:text-5xl font-bold">{sector.name}</h2>
                    </div>
                  </div>
                  <div className={`w-24 h-1.5 ${sector.color.iconBg} rounded-full mt-4`} />
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  {/* Content */}
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-bold mb-4`}>{sector.headline}</h3>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{sector.description}</p>

                    {/* Features - Card Style */}
                    <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                      <h4 className={`font-semibold mb-4 ${sector.color.accent}`}>Key Features</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {sector.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <div className={`p-1 rounded-full ${sector.color.tableBg}`}>
                              <CheckCircle2 className={`h-4 w-4 ${sector.color.accent}`} />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Buttons - More Prominent */}
                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" asChild className="shadow-lg">
                        <Link to="/contact">Get a Quote</Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild className="bg-white shadow-sm">
                        <Link to="/build-your-bag">Customize This Bag</Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right Column - Image + Specs Card */}
                  <div className="space-y-6">
                    {/* Image */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                      <div className="aspect-[4/3]">
                        <img
                          src={sector.image}
                          alt={sector.bagType}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* Bag type label */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-white/80 text-sm mb-1">Recommended Bag</p>
                        <p className="text-white text-2xl font-bold">{sector.bagType}</p>
                      </div>
                    </div>

                    {/* Specs Card */}
                    <div className={`bg-white rounded-xl overflow-hidden shadow-sm border ${sector.color.border}`}>
                      <div className={`${sector.color.iconBg} px-6 py-4`}>
                        <h4 className="font-semibold text-white">Specifications</h4>
                      </div>
                      <div className="divide-y">
                        <div className="px-6 py-4 flex justify-between items-center">
                          <span className="text-muted-foreground">Capacity</span>
                          <span className="font-semibold">{sector.specs.capacity}</span>
                        </div>
                        <div className="px-6 py-4 flex justify-between items-center">
                          <span className="text-muted-foreground">Dimensions</span>
                          <span className="font-semibold">{sector.specs.dimensions}</span>
                        </div>
                        <div className="px-6 py-4 flex justify-between items-center">
                          <span className="text-muted-foreground">Material</span>
                          <span className="font-semibold">{sector.specs.material}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Transition to CTA */}
      <div className={`h-16 bg-gradient-to-b ${sectors[sectors.length - 1].color.bg.replace('bg-', 'from-')} to-primary`} />

      {/* Custom Solution CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Don't See Your Product?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            We manufacture custom bulk bags for any agricultural application. Tell us what you're storing and we'll build the right solution.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/build-your-bag">Build Custom Bag</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Agriculture;

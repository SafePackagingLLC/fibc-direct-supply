import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Wheat, ArrowLeft, Sprout, Dog, Apple, CheckCircle2, Package, Ruler } from "lucide-react";
import industryAgriculture from "@/assets/industry-agriculture.jpg";
import productStandard from "@/assets/product-standard-fibc.jpg";

const ROTATION_INTERVAL = 6000; // 6 seconds per tab

const Agriculture = () => {
  const [activeTab, setActiveTab] = useState("grains");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
        dimensions: ["35\" x 35\" x 45\"", "35\" x 35\" x 50\""],
        material: "Woven polypropylene (160–200 GSM)"
      },
      image: productStandard,
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
        dimensions: ["35\" x 35\" x 35\"", "35\" x 35\" x 42\""],
        material: "Ventilated woven polypropylene"
      },
      image: productStandard,
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
        dimensions: ["35\" x 35\" x 40\"", "35\" x 35\" x 45\""],
        material: "Food-grade woven polypropylene"
      },
      image: productStandard,
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
        dimensions: ["35\" x 35\" x 40\"", "37\" x 37\" x 45\""],
        material: "Open-weave polypropylene"
      },
      image: productStandard,
    }
  ];

  const activeSector = sectors.find(s => s.id === activeTab) || sectors[0];
  const ActiveIcon = activeSector.icon;

  // Get next tab in rotation
  const getNextTab = useCallback(() => {
    const currentIndex = sectors.findIndex(s => s.id === activeTab);
    const nextIndex = (currentIndex + 1) % sectors.length;
    return sectors[nextIndex].id;
  }, [activeTab, sectors]);

  // Auto-rotate tabs
  useEffect(() => {
    if (isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setActiveTab(getNextTab());
          return 0;
        }
        return prev + (100 / (ROTATION_INTERVAL / 50)); // Update every 50ms
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [isPaused, getNextTab]);

  // Handle manual tab click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setProgress(0);
    setIsPaused(true);
    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

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
                Bulk bags engineered for agricultural products—from grains and seeds to animal feed and fresh produce. Select a category below to find the right solution.
              </p>

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

      {/* Tabs Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-col items-center mb-12">
            <p className="text-sm text-muted-foreground mb-4 font-medium">What are you storing?</p>
            <div className="inline-flex bg-background border shadow-lg rounded-2xl p-2 gap-2">
              {sectors.map((sector) => {
                const Icon = sector.icon;
                const isActive = activeTab === sector.id;
                return (
                  <button
                    key={sector.id}
                    onClick={() => handleTabClick(sector.id)}
                    className={`relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-medium transition-all overflow-hidden ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {/* Progress bar for active tab */}
                    {isActive && (
                      <div
                        className="absolute bottom-0 left-0 h-1 bg-primary-foreground/40 transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                    <Icon className={`h-5 w-5 ${isActive ? "" : "opacity-70"}`} />
                    <span className="hidden sm:inline">{sector.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-background rounded-2xl shadow-sm border p-8 md:p-12 overflow-hidden">
            <div
              key={activeTab}
              className="grid lg:grid-cols-2 gap-12 items-start animate-fade-in"
            >
              {/* Left Content */}
              <div>
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-5 rounded-2xl bg-primary text-primary-foreground shadow-lg">
                    <ActiveIcon className="h-10 w-10" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Recommended Bag</p>
                    <p className="text-xl font-bold text-primary">{activeSector.bagType}</p>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4">{activeSector.headline}</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">{activeSector.description}</p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {activeSector.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" asChild>
                    <Link to="/contact">Get a Quote</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/build-your-bag">Customize This Bag</Link>
                  </Button>
                </div>

                {/* Specs Card */}
                <div className="bg-muted/50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Ruler className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold">Specifications</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-muted-foreground">Capacity</span>
                      <span className="font-medium">{activeSector.specs.capacity}</span>
                    </div>
                    <div className="flex justify-between items-start pb-3 border-b">
                      <span className="text-muted-foreground">Dimensions</span>
                      <div className="flex flex-col gap-2 items-end">
                        {activeSector.specs.dimensions.map((dim, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm font-medium">
                            {dim}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Material</span>
                      <span className="font-medium">{activeSector.specs.material}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className="h-full">
                <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-primary/5 via-muted/50 to-primary/10">
                  <img
                    src={activeSector.image}
                    alt={activeSector.bagType}
                    className="w-full h-full object-cover"
                  />
                  {/* Badge overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">Product Type</p>
                        <p className="text-white text-lg font-semibold">{activeSector.bagType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

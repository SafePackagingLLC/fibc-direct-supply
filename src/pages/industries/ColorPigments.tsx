import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Palette, ArrowLeft, Sun, CircleDot, Flame, Sparkles, CheckCircle2, Package, Ruler, Zap, ShieldAlert, FlaskConical, Wind } from "lucide-react";
import productStandard from "@/assets/product-standard-fibc.jpg";
import industryColorPigments from "@/assets/industry-color-pigments.jpg";

const ROTATION_INTERVAL = 6000; // 6 seconds per tab

const ColorPigments = () => {
  const [activeTab, setActiveTab] = useState("tio2");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectors = [
    {
      id: "tio2",
      name: "Titanium Dioxide",
      icon: Sun,
      headline: "Bulk Bags for TiO2 White Pigments",
      description: "Titanium dioxide accounts for 60% of global pigment production. Our bags are engineered for TiO2's fine particles, abrasive nature, and strict containment requirements—especially important given EU regulatory classifications.",
      bagType: "Lined FIBC",
      features: [
        "Dust-proof sealed construction for fine particles",
        "PE liner prevents product contact with fabric",
        "Rated for max 2-pallet stacking (1 tonne bags)",
        "Moisture barrier protects against clumping"
      ],
      specs: {
        capacity: "1,000–1,500 kg",
        dimensions: ["35\" x 35\" x 45\"", "35\" x 35\" x 50\""],
        material: "Woven PP with PE liner (180–200 GSM)"
      },
      image: productStandard,
    },
    {
      id: "iron-oxide",
      name: "Iron Oxide",
      icon: CircleDot,
      headline: "UV-Resistant Bags for Iron Oxide Pigments",
      description: "Iron oxide pigments for construction, coatings, and plastics need protection during outdoor storage and transport. Our UV-stabilized bags maintain product integrity from manufacturing to job site.",
      bagType: "UV-Stabilized FIBC",
      features: [
        "UV-stabilized fabric for outdoor storage",
        "Moisture barrier liner prevents clumping",
        "Ideal for concrete, brick, and paving applications",
        "Weather-resistant construction"
      ],
      specs: {
        capacity: "1,000–2,000 kg",
        dimensions: ["35\" x 35\" x 40\"", "37\" x 37\" x 50\""],
        material: "UV-stabilized woven PP (160–200 GSM)"
      },
      image: productStandard,
    },
    {
      id: "carbon-black",
      name: "Carbon Black",
      icon: Flame,
      headline: "Anti-Static Bags for Carbon Black Safety",
      description: "Carbon black is a combustible dust requiring strict static control. Our Type C and Type D anti-static bags safely dissipate electrostatic charges to prevent ignition during filling and discharge operations.",
      bagType: "Type D Anti-Static FIBC",
      features: [
        "Static dissipative fabric—no grounding required",
        "Eliminates spark ignition risk",
        "Conductive threads throughout construction",
        "Meets IEC 61340-4-4 safety standards"
      ],
      specs: {
        capacity: "500–1,000 kg",
        dimensions: ["35\" x 35\" x 35\"", "35\" x 35\" x 42\""],
        material: "Anti-static woven PP with conductive threads"
      },
      image: productStandard,
    },
    {
      id: "organic",
      name: "Organic Pigments",
      icon: Sparkles,
      headline: "Light-Protected Bags for Organic Pigments",
      description: "Azo and phthalocyanine pigments deliver vibrant colors for inks, paints, and plastics but are sensitive to light. Our tight-weave construction contains ultra-fine particles while liners protect color integrity.",
      bagType: "Tight-Weave Lined FIBC",
      features: [
        "Tight-weave fabric contains ultra-fine particles",
        "Liner protects against light degradation",
        "Prevents agglomeration and clumping",
        "Single-use options prevent cross-contamination"
      ],
      specs: {
        capacity: "500–1,000 kg",
        dimensions: ["35\" x 35\" x 35\"", "35\" x 35\" x 40\""],
        material: "Tight-weave PP with aluminum foil liner option"
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
                  <Palette className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Color Pigments</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Specialized bulk bags for titanium dioxide, iron oxide, carbon black, and organic pigments. From static control to contamination prevention—select your pigment type below.
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
                src={industryColorPigments}
                alt="Color pigment bulk bags"
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
            <p className="text-sm text-muted-foreground mb-4 font-medium">What type of pigment?</p>
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

      {/* Common Challenges Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Common Challenges We Solve</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pigment handling presents unique safety and quality challenges. Here's how our specialized bags address them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Challenge 1 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600 flex-shrink-0">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Static Discharge & Ignition</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Fine pigment powders generate static electricity during movement. Carbon black is combustible and can ignite from a single spark.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Type C & Type D anti-static bags dissipate charges safely</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600 flex-shrink-0">
                  <Palette className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Cross-Contamination</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Even trace amounts of one color contaminating another ruins entire batches—especially critical for automotive coating tolerances.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Single-use liners and dedicated bags per color batch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 3 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-100 text-red-600 flex-shrink-0">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Regulatory Compliance</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    TiO2 is now classified as a suspected carcinogen in the EU. Proper containment and dust control are mandatory requirements.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Sealed construction with dust-proof closures for compliance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 4 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600 flex-shrink-0">
                  <Wind className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Fine Particle Leakage</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Ultra-fine pigment particles escape through standard weave fabric, causing product loss and facility contamination.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Tight-weave seamless construction with PE or foil liners</span>
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
          <h2 className="text-3xl font-bold mb-3">Need Pigment-Safe Bulk Bags?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            From anti-static carbon black bags to contamination-free liner options, we'll build the right solution for your pigment type.
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

export default ColorPigments;

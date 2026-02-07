import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { HardHat, ArrowLeft, Container, Mountain, Hammer, Layers, CheckCircle2, Package, Ruler, Droplets, Sun, Weight, Shield } from "lucide-react";
import productStandard from "@/assets/product-standard-fibc.jpg";
import industryConstruction from "@/assets/industry-construction.jpg";

const ROTATION_INTERVAL = 6000; // 6 seconds per tab

const Construction = () => {
  const [activeTab, setActiveTab] = useState("cement");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectors = [
    {
      id: "cement",
      name: "Cement & Portland",
      icon: Container,
      headline: "Moisture-Protected Bags for Cement & Fly Ash",
      description: "Portland cement, fly ash, and slag are fine powders that harden instantly when exposed to moisture. Our coated bags with PE liners and dust-proof closures keep cement dry from plant to pour.",
      bagType: "Coated FIBC with PE Liner",
      features: [
        "Coated fabric blocks moisture transmission",
        "PE liner provides secondary moisture barrier",
        "Dust-proof spout top for clean filling",
        "UV-stabilized for outdoor job site storage"
      ],
      specs: {
        capacity: "1,000–1,500 kg",
        dimensions: ["35\" x 35\" x 45\"", "35\" x 35\" x 50\""],
        material: "Coated woven PP with PE liner (180–200 GSM)"
      },
      image: productStandard,
    },
    {
      id: "aggregates",
      name: "Sand & Aggregates",
      icon: Mountain,
      headline: "Heavy-Duty Bags for Sand, Gravel & Crushed Stone",
      description: "Aggregates are heavy, abrasive, and sharp-edged—demanding the toughest bags. Our heavy-duty construction with reinforced loops handles loads up to 2,500 kg and withstands rough job site handling.",
      bagType: "Heavy-Duty Standard FIBC",
      features: [
        "Extra-heavy 200–240 GSM fabric",
        "Reinforced lift loops for repeated use",
        "Full-open bottom for fast discharge",
        "Puncture and abrasion resistant"
      ],
      specs: {
        capacity: "1,500–2,500 kg",
        dimensions: ["37\" x 37\" x 50\"", "37\" x 37\" x 55\""],
        material: "Heavy-duty woven PP (200–240 GSM)"
      },
      image: productStandard,
    },
    {
      id: "drymix",
      name: "Dry Mix Products",
      icon: Hammer,
      headline: "Controlled-Fill Bags for Mortar, Plaster & Grout",
      description: "Pre-mixed mortar, plaster, stucco, and grout require precise moisture control and clean filling. Our lined bags with spout tops prevent contamination and keep products ready-to-use.",
      bagType: "Lined FIBC with Spout Top",
      features: [
        "Spout top for controlled, dust-free filling",
        "Spout bottom for metered discharge",
        "Coated or lined for moisture protection",
        "Maintains product consistency"
      ],
      specs: {
        capacity: "1,000–1,500 kg",
        dimensions: ["35\" x 35\" x 40\"", "35\" x 35\" x 45\""],
        material: "Coated woven PP with PE liner (160–180 GSM)"
      },
      image: productStandard,
    },
    {
      id: "gypsum",
      name: "Gypsum & Calcium",
      icon: Layers,
      headline: "Sealed Bags for Moisture-Sensitive Gypsum & Lime",
      description: "Gypsum powder and lime are extremely hygroscopic—they absorb moisture from air and degrade rapidly. Our sealed bags with moisture barrier liners protect these sensitive materials in any storage condition.",
      bagType: "Lined FIBC with Moisture Barrier",
      features: [
        "PE or aluminum foil liner options",
        "Sealed closures prevent humidity exposure",
        "Prevents caking and degradation",
        "Climate-controlled storage compatible"
      ],
      specs: {
        capacity: "500–1,000 kg",
        dimensions: ["35\" x 35\" x 35\"", "35\" x 35\" x 42\""],
        material: "Woven PP with foil or PE liner (160–180 GSM)"
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

  // Handle manual tab click - stops auto-rotation permanently
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setProgress(0);
    setIsPaused(true);
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
                  <HardHat className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Construction</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Heavy-duty bulk bags for cement, sand, aggregates, dry mix, and gypsum. Built for job site durability, moisture protection, and safe handling of loads up to 2,500 kg.
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
                src={industryConstruction}
                alt="Construction bulk bags"
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
            <p className="text-sm text-muted-foreground mb-4 font-medium">What material are you handling?</p>
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
              Construction sites demand tough, reliable packaging. Here's how our bags handle the harshest conditions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Challenge 1 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600 flex-shrink-0">
                  <Droplets className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Moisture Damage</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Cement hardens instantly, gypsum degrades, and dry mix clumps when exposed to even minor moisture.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Coated bags with PE liners and sealed closures</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600 flex-shrink-0">
                  <Sun className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">UV Degradation</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Extended outdoor storage at job sites breaks down standard polypropylene, weakening bags over time.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>UV-stabilized fabric rated for 200-400+ hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 3 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-100 text-red-600 flex-shrink-0">
                  <Weight className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Heavy Loads & Forklift Safety</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Bags up to 5,000 lbs require proper safety factors. Over 70% of forklift accidents are preventable.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>5:1 or 6:1 safety factor with reinforced lift loops</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 4 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600 flex-shrink-0">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Puncture & Abrasion</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Sharp aggregates, rough handling, and forklift tines can puncture or tear standard-weight bags.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Heavy-duty 200-240 GSM fabric, abrasion-resistant</span>
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
          <h2 className="text-3xl font-bold mb-3">Ready for Your Construction Project?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            From cement plants to job sites, we'll match the right bag to your material and handling requirements.
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

export default Construction;

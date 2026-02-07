import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Recycle, ArrowLeft, Package, Wrench, Shirt, Cpu, CheckCircle2, Ruler, Trash2, Zap, Scale, RotateCcw } from "lucide-react";
import productStandard from "@/assets/product-standard-fibc.jpg";
import industryRecycling from "@/assets/industry-recycling.jpg";

const ROTATION_INTERVAL = 6000; // 6 seconds per tab

const Recycling = () => {
  const [activeTab, setActiveTab] = useState("plastic");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectors = [
    {
      id: "plastic",
      name: "Plastic",
      icon: Package,
      headline: "Baffle Bags for Plastic Pellets, Regrind & Flakes",
      description: "Recycled plastic pellets, regrind flakes, and post-consumer plastics require proper containment to prevent contamination between material types. Our baffle bags maintain shape for efficient stacking, while duffle tops allow easy loading of loose scrap materials.",
      bagType: "Baffle FIBC with PE Liner",
      features: [
        "Baffle design maintains box shape for stacking",
        "Duffle top for easy loading of loose materials",
        "PE liner prevents cross-contamination",
        "6:1 SFR for multi-trip reuse (5-10 cycles)"
      ],
      specs: {
        capacity: "500–1,500 kg",
        dimensions: ["35\" x 35\" x 40\"", "37\" x 37\" x 45\""],
        material: "Woven PP with PE liner (160–180 GSM)"
      },
      image: productStandard,
    },
    {
      id: "metal",
      name: "Metal",
      icon: Wrench,
      headline: "Heavy-Duty Bags for Ferrous & Non-Ferrous Scrap",
      description: "Shredded metal scrap—whether ferrous (steel, iron) or non-ferrous (aluminum, copper, brass)—demands puncture-resistant, heavy-duty construction. Our reinforced bags with 200+ GSM fabric and 6:1 safety factor handle the weight and sharp edges of metal recycling operations.",
      bagType: "Heavy-Duty Reinforced FIBC",
      features: [
        "200+ GSM puncture-resistant fabric",
        "Reinforced bottom panel for sharp materials",
        "6:1 Safety Factor for multi-trip use",
        "Reinforced lift loops for heavy loads"
      ],
      specs: {
        capacity: "1,000–2,000 kg",
        dimensions: ["35\" x 35\" x 35\"", "40\" x 40\" x 40\""],
        material: "Heavy-duty woven PP (200+ GSM)"
      },
      image: productStandard,
    },
    {
      id: "textile",
      name: "Textile",
      icon: Shirt,
      headline: "Ventilated Bags for Clothing & Fiber Reclamation",
      description: "Used clothing, wiping rags, and shredded textiles for fiber reclamation are bulky but lightweight. Our ventilated bags with large duffle openings allow airflow to prevent moisture buildup and mold, while oversized capacities accommodate the volume of textile recycling operations.",
      bagType: "Ventilated FIBC with Duffle Top",
      features: [
        "Breathable ventilated panels prevent mold",
        "Extra-large duffle top for easy loading",
        "High-volume capacity for bulky materials",
        "Color-coding available for material sorting"
      ],
      specs: {
        capacity: "300–800 kg",
        dimensions: ["40\" x 40\" x 50\"", "45\" x 45\" x 55\""],
        material: "Ventilated woven PP (140–160 GSM)"
      },
      image: productStandard,
    },
    {
      id: "ewaste",
      name: "E-Waste",
      icon: Cpu,
      headline: "Antistatic Bags for Circuit Boards & Electronics",
      description: "E-waste recycling—circuit boards, shredded WEEE, and precious metal concentrates—requires antistatic protection and puncture resistance. Our Type B/C bags safely dissipate static charges while protecting against sharp edges from shredded electronics components.",
      bagType: "Type B/C Antistatic FIBC",
      features: [
        "Type B/C antistatic construction",
        "Puncture-resistant for shredded components",
        "Contamination control liners available",
        "Compliant with R2/e-Stewards requirements"
      ],
      specs: {
        capacity: "500–1,000 kg",
        dimensions: ["35\" x 35\" x 35\"", "35\" x 35\" x 40\""],
        material: "Antistatic woven PP with liner (160–180 GSM)"
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
                  <Recycle className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Recycling</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Durable, reusable bulk bags engineered for recycling operations. From plastic pellets and metal shred to textile reclamation and e-waste—our 6:1 SFR bags handle 5-10 reuse cycles for maximum cost efficiency.
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
                src={industryRecycling}
                alt="Recycling bulk bags"
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
            <p className="text-sm text-muted-foreground mb-4 font-medium">What are you recycling?</p>
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
                        <Recycle className="h-5 w-5 text-white" />
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
              Recycling operations demand durability and cost efficiency. Here's how our bags maximize reuse cycles and minimize material loss.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Challenge 1 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-100 text-red-600 flex-shrink-0">
                  <Trash2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Material Contamination</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Cross-contamination between material types degrades recyclate quality and reduces market value.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Dedicated bags with liners & color-coding</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600 flex-shrink-0">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Sharp Edge Punctures</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Shredded metal and circuit boards tear standard bags, causing material loss and safety hazards.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>200+ GSM fabric with reinforced bottom panels</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 3 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600 flex-shrink-0">
                  <Scale className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Weight Variability</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Metal scrap (4,000+ lbs) vs. textiles (lightweight/bulky) require different capacity designs.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Customized SWL from 300 kg to 2,000 kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 4 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-green-100 text-green-600 flex-shrink-0">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Multi-Trip Durability</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Single-use bags drive up costs—recyclers need 5-10 reuse cycles for economic viability.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>6:1 Safety Factor for multi-trip certification</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Banner */}
      <section className="py-12 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">Recycling Industry Compliance Standards</h3>
            <p className="text-muted-foreground">Our bags support responsible recycling certifications and environmental standards</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">R2</div>
              <div className="text-sm text-muted-foreground">Responsible Recycling</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">e-Stewards</div>
              <div className="text-sm text-muted-foreground">No Hazardous Export</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">ISO 14001</div>
              <div className="text-sm text-muted-foreground">Environmental Mgmt</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">ISRI</div>
              <div className="text-sm text-muted-foreground">Scrap Standards</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">6:1 SFR</div>
              <div className="text-sm text-muted-foreground">Multi-Trip Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solution CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Optimize Your Recycling Operation?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Get durable, reusable bulk bags that reduce per-cycle costs and improve material handling efficiency. Volume discounts available for multi-trip orders.
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

export default Recycling;

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mountain, ArrowLeft, Layers, Gem, Droplets, Sparkles, CheckCircle2, Ruler, Wind, Droplet, Weight, Zap } from "lucide-react";
import industryMinerals from "@/assets/industry-minerals.jpg";
import coatedFibc from "@/assets/bags/coated-fibc.jpg";
import constructionContext from "@/assets/bags/construction-context.jpg";
import linedFibc from "@/assets/bags/lined-fibc.jpg";

const ROTATION_INTERVAL = 6000; // 6 seconds per tab

const Minerals = () => {
  const [activeTab, setActiveTab] = useState("ite");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectors = [
    {
      id: "calcium",
      name: "Calcite",
      icon: Layers,
      headline: "Moisture-Barrier Bags for Calcite & Limestone",
      description: "Calcium carbonate (GCC, PCC), limestone powder, chalk, and lime are sluggish, adhesive powders that readily pack and cake when exposed to moisture. Our coated bags with PE liners and dust-proof seams protect these hygroscopic materials and ensure consistent discharge.",
      bagType: "Coated FIBC with PE Liner",
      features: [
        "Coated fabric blocks moisture ingress",
        "PE liner provides secondary barrier",
        "Dust-proof seams prevent powder leakage",
        "Spout bottom for controlled discharge"
      ],
      specs: {
        capacity: "1,000–1,500 kg",
        dimensions: ["35\" x 35\" x 45\"", "35\" x 35\" x 50\""],
        material: "Coated woven PP with PE liner (180–200 GSM)"
      },
      image: coatedFibc,
    },
    {
      id: "silica",
      name: "Silica Sand",
      icon: Gem,
      headline: "Dust-Controlled Bags for Silica & Industrial Sand",
      description: "Silica sand, quartz, glass sand, and foundry sand require strict dust control—respirable crystalline silica is a serious health hazard. Our heavy-duty bags with dust-proof closures minimize airborne particles during filling and discharge, protecting workers and product.",
      bagType: "Heavy-Duty FIBC with Dust-Proof Closure",
      features: [
        "Dust-proof spout closures reduce airborne silica",
        "Heavy-duty 200+ GSM for abrasive materials",
        "Type B available for combustible additive mixes",
        "Reinforced lift loops for dense loads"
      ],
      specs: {
        capacity: "1,000–2,000 kg",
        dimensions: ["35\" x 35\" x 40\"", "37\" x 37\" x 45\""],
        material: "Heavy-duty woven PP (200–240 GSM)"
      },
      image: constructionContext,
    },
    {
      id: "kaolin",
      name: "Kaolin Clay",
      icon: Droplets,
      headline: "Clean-Handling Bags for Kaolin & China Clay",
      description: "Kaolin (china clay) is valued for its whiteness and fine particle size in ceramics, paper coating, and refractories. Contamination ruins product value. Our moisture-resistant bags with sealed closures preserve kaolin's critical whiteness and prevent discoloration from handling.",
      bagType: "Lined FIBC with Sealed Closure",
      features: [
        "Moisture-resistant construction preserves quality",
        "Sealed closures prevent contamination",
        "Clean handling maintains whiteness",
        "Sift-proof seams for fine particles"
      ],
      specs: {
        capacity: "1,000–1,500 kg",
        dimensions: ["35\" x 35\" x 45\"", "35\" x 35\" x 50\""],
        material: "Woven PP with PE liner (160–180 GSM)"
      },
      image: linedFibc,
    },
    {
      id: "talc",
      name: "Talc & Bentonite",
      icon: Sparkles,
      headline: "Moisture-Controlled Bags for Talc & Bentonite",
      description: "Talc becomes unmanageable when wet, behaving like a liquid. Bentonite swells up to 8x volume when hydrated, losing its binding properties. Our lined bags with strict moisture control and fine-powder sift-proofing keep these sensitive minerals in optimal condition.",
      bagType: "Lined FIBC with Moisture Control",
      features: [
        "Strict moisture barrier for hygroscopic materials",
        "Sift-proof construction for ultra-fine powders",
        "Dust containment during filling/discharge",
        "Dry storage preservation"
      ],
      specs: {
        capacity: "500–1,500 kg",
        dimensions: ["35\" x 35\" x 40\"", "35\" x 35\" x 45\""],
        material: "Woven PP with moisture-control liner (160–180 GSM)"
      },
      image: linedFibc,
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
                  <Mountain className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Minerals</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Heavy-duty bulk bags engineered for industrial minerals—calcium carbite, silica sand, kaolin clay, talc, and bentonite. Moisture barriers, dust control, and reinforced construction for demanding mineral handling.
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
                src={industryMinerals}
                alt="Mineral bulk bags"
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
            <p className="text-sm text-muted-foreground mb-4 font-medium">What mineral are you packaging?</p>
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
                        <Mountain className="h-5 w-5 text-white" />
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
              Industrial minerals demand specialized handling. Here's how our bags protect product quality and worker safety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Challenge 1 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-100 text-red-600 flex-shrink-0">
                  <Wind className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Fine Powder Dust</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Respirable silica is a serious health hazard. Airborne mineral dust causes product loss and environmental issues.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Dust-proof seams and spout closures</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600 flex-shrink-0">
                  <Droplet className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Moisture Degradation</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Calcium carbonate cakes, bentonite loses swelling capacity, talc clumps when exposed to moisture.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>PE/foil liners with coated fabric barriers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 3 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600 flex-shrink-0">
                  <Weight className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Heavy Density Loads</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Minerals range 35-58 lb/cu ft bulk density, often exceeding 2,000 kg per bag.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>5:1 or 6:1 SFR with 200-240 GSM fabric</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 4 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600 flex-shrink-0">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Static & Dust Explosion</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Silica mixed with combustible resins can ignite. Static buildup during transfer creates ignition risk.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Type B antistatic bags for combustible mixes</span>
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
            <h3 className="text-xl font-semibold mb-2">Mineral Industry Compliance Standards</h3>
            <p className="text-muted-foreground">Our bags meet quality, safety, and environmental standards for mineral handling</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">ISO 9001</div>
              <div className="text-sm text-muted-foreground">Quality Management</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">ISO 14001</div>
              <div className="text-sm text-muted-foreground">Environmental Mgmt</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">ISO 45001</div>
              <div className="text-sm text-muted-foreground">Health & Safety</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">ISO 21898</div>
              <div className="text-sm text-muted-foreground">FIBC Standards</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">OSHA</div>
              <div className="text-sm text-muted-foreground">Silica Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solution CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Need Heavy-Duty Mineral Bags?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Get bulk bags engineered for your specific mineral—calcium carbonate, silica, kaolin, talc, or bentonite. Moisture barriers, dust control, and reinforced construction included.
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

export default Minerals;

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Pill, ArrowLeft, FlaskConical, Tablets, Sparkles, Beaker, CheckCircle2, Package, Ruler, ShieldX, Zap, Droplets, FileWarning } from "lucide-react";
import productFoodGrade from "@/assets/product-food-grade.jpg";
import industryPharmaceuticals from "@/assets/industry-pharmaceuticals.jpg";

const ROTATION_INTERVAL = 6000; // 6 seconds per tab

const Pharmaceuticals = () => {
  const [activeTab, setActiveTab] = useState("api");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectors = [
    {
      id: "api",
      name: "APIs",
      icon: FlaskConical,
      headline: "Barrier-Protected Bags for Active Pharmaceutical Ingredients",
      description: "Active Pharmaceutical Ingredients are the therapeutic molecules that make drugs work. Even trace contamination or moisture exposure can compromise entire batches. Our pharma-grade bags with EVOH/foil barrier liners protect API potency from production to formulation.",
      bagType: "Pharma-Grade FIBC with Barrier Liner",
      features: [
        "cGMP certified clean-room manufacturing",
        "EVOH or aluminum foil barrier liner",
        "Dust-proof seams prevent particle ingress",
        "Full Certificate of Analysis (CoA) included"
      ],
      specs: {
        capacity: "500–1,000 kg",
        dimensions: ["35\" x 35\" x 35\"", "35\" x 35\" x 42\""],
        material: "Pharma-grade PP with barrier liner (160–180 GSM)"
      },
      image: productFoodGrade,
    },
    {
      id: "excipients",
      name: "Excipients",
      icon: Tablets,
      headline: "Clean-Room Bags for Pharmaceutical Excipients",
      description: "Excipients like lactose, starch, cellulose, and talc are inactive but essential—they enable proper drug delivery, stability, and absorption. Our clean-room manufactured bags with PE liners protect these hygroscopic materials from moisture and contamination.",
      bagType: "Pharma-Grade FIBC with PE Liner",
      features: [
        "Clean-room manufactured (ISO Class 7/8)",
        "PE liner for moisture protection",
        "Sift-proof construction for fine powders",
        "GMP-compliant with full traceability"
      ],
      specs: {
        capacity: "500–1,500 kg",
        dimensions: ["35\" x 35\" x 40\"", "35\" x 35\" x 45\""],
        material: "Clean-room PP with PE liner (160–180 GSM)"
      },
      image: productFoodGrade,
    },
    {
      id: "nutraceuticals",
      name: "Nutraceuticals",
      icon: Sparkles,
      headline: "Food-Grade Bags for Vitamins, Minerals & Supplements",
      description: "Nutraceuticals and dietary supplements—vitamins, minerals, protein powders, and health ingredients—require food-grade packaging with strict allergen controls. Our BRC/SQF-certified bags maintain potency and prevent cross-contamination between batches.",
      bagType: "Food-Grade FIBC (BRC/SQF)",
      features: [
        "BRC/SQF certified manufacturing",
        "Moisture barrier preserves potency",
        "Allergen control protocols",
        "Single-use prevents cross-contact"
      ],
      specs: {
        capacity: "500–1,000 kg",
        dimensions: ["35\" x 35\" x 35\"", "35\" x 35\" x 42\""],
        material: "Food-grade PP with PE liner (160–180 GSM)"
      },
      image: productFoodGrade,
    },
    {
      id: "intermediates",
      name: "Intermediates",
      icon: Beaker,
      headline: "Antistatic Bags for Chemical Intermediates & Reagents",
      description: "Pharmaceutical intermediates and fine chemicals used in API synthesis can be flammable or static-sensitive. Our Type C and Type D antistatic bags safely dissipate static charges during filling and discharge, preventing ignition in powder-handling environments.",
      bagType: "Type C/D Antistatic FIBC",
      features: [
        "Type D dissipative (no grounding needed)",
        "Type C conductive (with grounding)",
        "Conductive liner options available",
        "Safe for flammable powder atmospheres"
      ],
      specs: {
        capacity: "500–1,000 kg",
        dimensions: ["35\" x 35\" x 35\"", "35\" x 35\" x 40\""],
        material: "Antistatic PP with conductive liner (160–180 GSM)"
      },
      image: productFoodGrade,
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
                  <Pill className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Pharmaceuticals</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                cGMP-compliant pharma-grade bulk bags for APIs, excipients, nutraceuticals, and intermediates. Clean-room manufactured with full documentation, Certificates of Analysis, and batch traceability.
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
                src={industryPharmaceuticals}
                alt="Pharmaceutical bulk bags"
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
            <p className="text-sm text-muted-foreground mb-4 font-medium">What are you packaging?</p>
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
              Pharmaceutical packaging demands zero compromise. Here's how our bags protect your products and compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Challenge 1 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-100 text-red-600 flex-shrink-0">
                  <ShieldX className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Cross-Contamination</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Even trace-level API releases can compromise entire batches or cause serious patient harm.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Clean-room bags with dust-proof seams</span>
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
                  <h3 className="font-semibold text-lg mb-2">Static Discharge</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Pharmaceutical powders generate static during transfer, creating ignition and handling risks.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Type C/D antistatic bags dissipate charges safely</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 3 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600 flex-shrink-0">
                  <Droplets className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Potency & Stability Loss</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    APIs degrade when exposed to moisture, oxygen, or light—losing therapeutic effectiveness.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>EVOH/foil barrier liners with sealed closures</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 4 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600 flex-shrink-0">
                  <FileWarning className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Documentation Gaps</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Missing Certificates of Analysis or GMP records can delay or destroy shipments at customs.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Full CoA, batch records, and lot traceability</span>
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
            <h3 className="text-xl font-semibold mb-2">Pharmaceutical Compliance Standards</h3>
            <p className="text-muted-foreground">Our bags meet the strictest pharmaceutical manufacturing requirements</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">cGMP</div>
              <div className="text-sm text-muted-foreground">FDA / EU Compliant</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">ISO 9001</div>
              <div className="text-sm text-muted-foreground">Quality Management</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">ISO 22000</div>
              <div className="text-sm text-muted-foreground">Food Safety</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">Clean-Room</div>
              <div className="text-sm text-muted-foreground">ISO Class 7/8</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">CoA</div>
              <div className="text-sm text-muted-foreground">Full Documentation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solution CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Need Pharmaceutical-Grade Bulk Bags?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Contact our team to discuss your specific requirements, certifications, and documentation needs. Full validation support available.
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

export default Pharmaceuticals;

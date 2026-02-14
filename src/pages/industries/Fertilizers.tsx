import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sprout, ArrowLeft, Atom, CircleDot, Gem, Leaf, CheckCircle2, Ruler, Droplets, AlertTriangle, FlaskConical, Zap } from "lucide-react";
import industryFertilizers from "@/assets/industry-fertilizers.jpg";
import linedFibc from "@/assets/bags/lined-fibc.jpg";
import coatedFibc from "@/assets/bags/coated-fibc.jpg";
import antistaticFibc from "@/assets/bags/antistatic-fibc.jpg";

const ROTATION_INTERVAL = 6000; // 6 seconds per tab

const Fertilizers = () => {
  const [activeTab, setActiveTab] = useState("nitrogen");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectors = [
    {
      id: "nitrogen",
      name: "Nitrogen",
      icon: Atom,
      headline: "Moisture-Barrier Bags for Urea & Nitrogen Fertilizers",
      description: "Urea (46-0-0) and ammonium sulfate are highly hygroscopic—urea's Critical Relative Humidity is just 73% at 30°C. Our PE-lined bags with sealed closures prevent moisture absorption that causes caking, flow problems, and nitrogen loss during storage.",
      bagType: "Lined FIBC with PE Moisture Barrier",
      features: [
        "PE liner prevents moisture ingress",
        "Sealed closures maintain <60% RH inside bag",
        "Dust-proof seams reduce nitrogen loss",
        "UV-stabilized for outdoor farm storage"
      ],
      specs: {
        capacity: "1,000–1,500 kg",
        dimensions: ["35\" x 35\" x 45\"", "35\" x 35\" x 50\""],
        material: "Woven PP with PE liner (160–180 GSM)"
      },
      image: linedFibc,
    },
    {
      id: "phosphate",
      name: "Phosphate",
      icon: CircleDot,
      headline: "Chemical-Resistant Bags for Phosphate Fertilizers",
      description: "DAP (18-46-0), MAP (11-52-0), and TSP are acidic and can corrode standard materials. Our chemical-resistant bags with protective liners maintain fertilizer efficacy and prevent degradation of bag components during extended storage.",
      bagType: "Chemical-Resistant FIBC with Liner",
      features: [
        "Chemical-resistant PP construction",
        "Protective liner prevents corrosion",
        "Moisture barrier maintains product quality",
        "Reinforced lift loops for dense loads"
      ],
      specs: {
        capacity: "1,000–1,500 kg",
        dimensions: ["35\" x 35\" x 45\"", "35\" x 35\" x 50\""],
        material: "Chemical-resistant woven PP with liner (160–180 GSM)"
      },
      image: linedFibc,
    },
    {
      id: "potash",
      name: "Potash",
      icon: Gem,
      headline: "Corrosion-Resistant Bags for Potash & Potassium",
      description: "MOP (0-0-60), SOP, and potassium nitrate are hygroscopic and highly corrosive to metal. Our sealed bags with strict moisture control prevent caking (which can reach 30-40% in humid conditions) while protecting lift loops and equipment from corrosion.",
      bagType: "Sealed FIBC with Moisture Control",
      features: [
        "Strict moisture barrier (<65% RH storage)",
        "Corrosion-resistant lift loops and closures",
        "Sealed construction prevents caking",
        "BOPP lamination for extended storage"
      ],
      specs: {
        capacity: "1,000–2,000 kg",
        dimensions: ["35\" x 35\" x 45\"", "37\" x 37\" x 50\""],
        material: "BOPP laminated woven PP (160–200 GSM)"
      },
      image: coatedFibc,
    },
    {
      id: "organic",
      name: "Organic & NPK",
      icon: Leaf,
      headline: "Antistatic Bags for Organic & Blended Fertilizers",
      description: "Pelletized organics, composted manure, and custom NPK blends can generate combustible dusts during handling. Our Type C/D antistatic bags safely dissipate static charges while BOPP lamination protects blended products during multi-season warehouse storage.",
      bagType: "Type C/D Antistatic FIBC",
      features: [
        "Type D dissipative (no grounding required)",
        "Safe for combustible organic dusts",
        "BOPP lamination for nutrient preservation",
        "Ventilated options for composted materials"
      ],
      specs: {
        capacity: "500–1,500 kg",
        dimensions: ["35\" x 35\" x 40\"", "35\" x 35\" x 50\""],
        material: "Antistatic woven PP with BOPP option (160–180 GSM)"
      },
      image: antistaticFibc,
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
      <section className="relative py-12 bg-amber-50/50">
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
                  <Sprout className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Fertilizers</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Moisture-resistant bulk bags engineered for nitrogen, phosphate, potash, and organic fertilizers. PE liners, BOPP lamination, and sealed closures protect hygroscopic materials from caking and nutrient loss.
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
                src={industryFertilizers}
                alt="Fertilizer bulk bags"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-amber-50/50">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-col items-center mb-12">
            <p className="text-sm text-muted-foreground mb-4 font-medium">What fertilizer are you packaging?</p>
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
                        <Sprout className="h-5 w-5 text-white" />
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
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-white">Common Challenges We Solve</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Fertilizers demand strict moisture control and chemical compatibility. Here's how our bags protect product quality and ensure safe handling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Challenge 1 */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 flex-shrink-0">
                  <Droplets className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Hygroscopic Caking</h3>
                  <p className="text-slate-400 text-sm mb-3">
                    Urea and potash absorb atmospheric moisture causing lumps, flow problems, and up to 30-40% caking rates.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>PE liners with sealed closures at &lt;60% RH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-500/20 text-red-400 flex-shrink-0">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Oxidizer Hazards</h3>
                  <p className="text-slate-400 text-sm mb-3">
                    Ammonium nitrate is a Class 5 Oxidizer with explosion risk if contaminated or confined under heat.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>OSHA 1910.109 compliant storage & labeling</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 3 */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-500/20 text-orange-400 flex-shrink-0">
                  <FlaskConical className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Chemical Corrosion</h3>
                  <p className="text-slate-400 text-sm mb-3">
                    Acidic phosphates and corrosive potash degrade bag materials and metal lift equipment over time.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Chemical-resistant PP with protective liners</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 4 */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-400 flex-shrink-0">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Static Ignition</h3>
                  <p className="text-slate-400 text-sm mb-3">
                    Fine fertilizer dusts and organic amendments create combustible atmospheres during handling.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Type C/D antistatic bags dissipate charges</span>
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
            <h3 className="text-xl font-semibold mb-2">Fertilizer Industry Compliance Standards</h3>
            <p className="text-muted-foreground">Our bags meet safety and quality standards for fertilizer storage and transport</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">OSHA</div>
              <div className="text-sm text-muted-foreground">1910.109 AN Storage</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">DOT 5.1</div>
              <div className="text-sm text-muted-foreground">Oxidizer Transport</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">NFPA 400</div>
              <div className="text-sm text-muted-foreground">Hazmat Code</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">ISO 21898</div>
              <div className="text-sm text-muted-foreground">FIBC Standards</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">UV 400+</div>
              <div className="text-sm text-muted-foreground">Outdoor Storage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solution CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Protect Your Fertilizers?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Get moisture-resistant bulk bags engineered for your specific fertilizer—urea, DAP, potash, or organic blends. PE liners, BOPP lamination, and sealed closures included.
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

export default Fertilizers;

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Apple, ArrowLeft, Wheat, Candy, Milk, Leaf, CheckCircle2, Package, Ruler, ShieldAlert, Bug, Droplets, AlertTriangle } from "lucide-react";
import productFoodGrade from "@/assets/product-food-grade.jpg";
import industryFoodProcessing from "@/assets/industry-food-processing.jpg";

const ROTATION_INTERVAL = 6000; // 6 seconds per tab

const FoodProcessing = () => {
  const [activeTab, setActiveTab] = useState("flour");
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectors = [
    {
      id: "flour",
      name: "Flour & Grains",
      icon: Wheat,
      headline: "Clean-Room Bags for Flour, Meal & Grain Products",
      description: "Wheat flour, rice flour, corn meal, and specialty flours require pristine packaging to prevent contamination. Our BRC/SQF-certified bags with PE liners and dust-proof seams keep flour products safe from field to bakery.",
      bagType: "Food-Grade FIBC with Liner",
      features: [
        "BRC/SQF certified clean-room manufacturing",
        "PE liner prevents moisture and contamination",
        "Sift-proof seams contain fine particles",
        "Full lot traceability for recall compliance"
      ],
      specs: {
        capacity: "1,000–1,500 kg",
        dimensions: ["35\" x 35\" x 45\"", "35\" x 35\" x 50\""],
        material: "Food-grade woven PP with PE liner (160–180 GSM)"
      },
      image: productFoodGrade,
    },
    {
      id: "sugar",
      name: "Sugar & Sweeteners",
      icon: Candy,
      headline: "Moisture-Barrier Bags for Sugar & Sweetener Products",
      description: "Granulated sugar, brown sugar, confectionery sugar, and dextrose absorb moisture instantly, causing clumping and degradation. Our sealed bags with moisture-barrier liners keep sweeteners free-flowing and production-ready.",
      bagType: "Lined FIBC with Moisture Barrier",
      features: [
        "Coated fabric blocks humidity transmission",
        "Sealed closures prevent moisture ingress",
        "Food-grade PE liner for product purity",
        "Prevents clumping and hardening"
      ],
      specs: {
        capacity: "1,000–2,000 kg",
        dimensions: ["35\" x 35\" x 45\"", "37\" x 37\" x 50\""],
        material: "Coated woven PP with moisture barrier (160–180 GSM)"
      },
      image: productFoodGrade,
    },
    {
      id: "dairy",
      name: "Dairy Powders",
      icon: Milk,
      headline: "Hygienic Bags for Milk Powder, Whey & Dairy Proteins",
      description: "Milk powder, whey protein, casein, and buttermilk powder demand the highest hygiene standards. Our clean-room manufactured bags with strict contamination controls meet the rigorous requirements of dairy processors worldwide.",
      bagType: "Food-Grade FIBC with PE Liner",
      features: [
        "100% virgin polypropylene construction",
        "Clean-room manufactured (positive pressure)",
        "Light table inspection & metal detection",
        "Strict HACCP compliance protocols"
      ],
      specs: {
        capacity: "500–1,000 kg",
        dimensions: ["35\" x 35\" x 35\"", "35\" x 35\" x 42\""],
        material: "Clean-room PP with PE liner (160–180 GSM)"
      },
      image: productFoodGrade,
    },
    {
      id: "spices",
      name: "Spices & Seasonings",
      icon: Leaf,
      headline: "Aroma-Preserving Bags for Spices, Herbs & Seasonings",
      description: "Ground spices, dried herbs, and seasoning blends lose potency when exposed to light, air, or moisture. Our lined bags with optional foil barriers preserve aroma and prevent flavor cross-contamination between batches.",
      bagType: "Lined FIBC with Foil Liner Option",
      features: [
        "Aluminum foil liner preserves aroma",
        "Light protection maintains potency",
        "Single-use prevents cross-contamination",
        "Sealed closures lock in freshness"
      ],
      specs: {
        capacity: "500–1,000 kg",
        dimensions: ["35\" x 35\" x 35\"", "35\" x 35\" x 40\""],
        material: "Food-grade PP with foil or PE liner (160–180 GSM)"
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
                  <Apple className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Industry Solutions</p>
                  <h1 className="text-4xl md:text-5xl font-bold">Food Processing</h1>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                FDA-compliant bulk bags manufactured in BRC/SQF-certified clean rooms for flour, sugar, dairy powders, and spices. Full traceability and contamination prevention for food safety compliance.
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
                src={industryFoodProcessing}
                alt="Food processing bulk bags"
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
              Food safety is non-negotiable. Here's how our bags protect your products and your brand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Challenge 1 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-100 text-red-600 flex-shrink-0">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Contamination Risk</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Foreign materials like thread, metal, or debris can enter bags during standard manufacturing.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Clean-room bags with light table & metal detection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600 flex-shrink-0">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Allergen Cross-Contact</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Undeclared allergens are the #1 cause of food recalls—often from shared packaging or lines.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Single-use dedicated bags with full traceability</span>
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
                  <h3 className="font-semibold text-lg mb-2">Moisture Absorption</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Sugar clumps, flour cakes, and dairy powders degrade when exposed to humidity.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>PE or foil liners with sealed, dust-proof closures</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge 4 */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-green-100 text-green-600 flex-shrink-0">
                  <Bug className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Pest & Rodent Attraction</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    Stored food products attract insects and rodents that can contaminate entire batches.
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Sealed construction with sift-proof seams</span>
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
            <h3 className="text-xl font-semibold mb-2">Food Safety Certifications</h3>
            <p className="text-muted-foreground">Our bags are manufactured to meet the highest food safety standards</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">FDA</div>
              <div className="text-sm text-muted-foreground">21 CFR §177.1520</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">BRC</div>
              <div className="text-sm text-muted-foreground">Global Standard</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">SQF</div>
              <div className="text-sm text-muted-foreground">GFSI Recognized</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">AIB</div>
              <div className="text-sm text-muted-foreground">Clean-Room Certified</div>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">HACCP</div>
              <div className="text-sm text-muted-foreground">Compliant Processes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solution CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Need Food-Grade Bulk Bags?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Get FDA-compliant bags from BRC-certified facilities. Full traceability, contamination prevention, and documentation included.
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

export default FoodProcessing;

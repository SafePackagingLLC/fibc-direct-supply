import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NavLink from "@/components/NavLink";

// Export configuration options for use in Contact page
export const bagTops = [
  { id: "open-top", name: "Open Top", image: "/images/bag-parts/open-top.png" },
  { id: "spout-top", name: "Spout Top", image: "/images/bag-parts/spout-top.png" },
  { id: "flap-top", name: "Flap Top", image: "/images/bag-parts/flap-top.png" },
  { id: "duffle-top", name: "Duffle Top", image: "/images/bag-parts/duffle-top.png" },
];

export const loopTypes = [
  { id: "cross-corner", name: "Cross-Corner Loops", image: "/images/bag-parts/loop-cross-corner.png" },
  { id: "corner-seam", name: "Corner Seam Loops", image: "/images/bag-parts/loop-corner-seam.png" },
  { id: "stevedore", name: "Stevedore Strap", image: "/images/bag-parts/loop-stevedore.png" },
  { id: "sleeve", name: "Sleeve Lifts", image: "/images/bag-parts/loop-sleeve.png" },
  { id: "single-point", name: "Single Point", image: "/images/bag-parts/loop-single-point.png" },
];

export const bagBottoms = [
  { id: "plain", name: "Plain Bottom", image: "/images/bag-parts/plain-bottom.png" },
  { id: "spout", name: "Spout Bottom", image: "/images/bag-parts/spout-bottom.png" },
];

export const constructionTypes = [
  { id: "4-panel", name: "4-Panel", image: "/images/bag-parts/4-panel.png" },
  { id: "u-panel", name: "U-panel", image: "/images/bag-parts/u-panel.png" },
  { id: "circular", name: "Circular", image: "/images/bag-parts/circular.png" },
  { id: "baffled", name: "Baffled", image: "/images/bag-parts/baffled.png" },
];

export const fabricTypes = [
  { id: "standard", name: "Standard PP", gsm: "150-180 GSM" },
  { id: "coated", name: "Coated Fabric", gsm: "180-200 GSM" },
  { id: "breathable", name: "Breathable", gsm: "160-180 GSM" },
  { id: "food-grade", name: "Food Grade", gsm: "180-220 GSM" },
];

export const linerOptions = [
  { id: "none", name: "No Liner" },
  { id: "pe", name: "PE Liner" },
  { id: "aluminum", name: "Aluminum Barrier" },
  { id: "food-safe", name: "Food-Safe Liner" },
];

export const capacities = [
  { id: "500", name: "500 kg" },
  { id: "1000", name: "1,000 kg" },
  { id: "1500", name: "1,500 kg" },
  { id: "2000", name: "2,000 kg" },
];

export interface BagConfiguration {
  top: string;
  loop: string;
  bottom: string;
  construction: string;
  fabric: string;
  liner: string;
  capacity: string;
}


const BuildYourBag = () => {
  const navigate = useNavigate();
  const [selectedTop, setSelectedTop] = useState("open-top");
  const [selectedLoop, setSelectedLoop] = useState("cross-corner");
  const [selectedBottom, setSelectedBottom] = useState("plain");
  const [selectedConstruction, setSelectedConstruction] = useState("4-panel");
  const [selectedFabric, setSelectedFabric] = useState("standard");
  const [selectedLiner, setSelectedLiner] = useState("none");
  const [selectedCapacity, setSelectedCapacity] = useState("1000");

  const handleRequestQuote = () => {
    const configuration: BagConfiguration = {
      top: selectedTop,
      loop: selectedLoop,
      bottom: selectedBottom,
      construction: selectedConstruction,
      fabric: selectedFabric,
      liner: selectedLiner,
      capacity: selectedCapacity,
    };
    navigate("/contact", { state: { bagConfiguration: configuration } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <NavLink to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </NavLink>
          </Button>
          <h1 className="text-4xl font-bold mb-2">Build Your Own FIBC Bag</h1>
          <p className="text-muted-foreground text-lg">
            Customize every aspect of your bulk bag — from top to bottom, loops to liner
          </p>
        </div>

        {/* Configuration Panel - Full Width */}
        <div className="space-y-8 pb-32">
          {/* Construction Selection */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Construction</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {constructionTypes.map((construction) => (
                <button
                  key={construction.id}
                  onClick={() => setSelectedConstruction(construction.id)}
                  className={`p-4 rounded-xl border-2 transition-all hover:border-primary hover:shadow-lg ${
                    selectedConstruction === construction.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border"
                  }`}
                >
                  <div className="aspect-square bg-muted/30 rounded-lg mb-3 flex items-center justify-center p-4">
                    <img src={construction.image} alt={construction.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-semibold text-center">{construction.name}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Loop Type Selection */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Loops</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {loopTypes.map((loop) => (
                <button
                  key={loop.id}
                  onClick={() => setSelectedLoop(loop.id)}
                  className={`p-4 rounded-xl border-2 transition-all hover:border-primary hover:shadow-lg ${
                    selectedLoop === loop.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border"
                  }`}
                >
                  <div className="aspect-square bg-muted/30 rounded-lg mb-3 flex items-center justify-center p-4">
                    <img src={loop.image} alt={loop.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-semibold text-center">{loop.name}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Bag Top Selection */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Bag Top</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bagTops.map((top) => (
                <button
                  key={top.id}
                  onClick={() => setSelectedTop(top.id)}
                  className={`p-4 rounded-xl border-2 transition-all hover:border-primary hover:shadow-lg ${
                    selectedTop === top.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border"
                  }`}
                >
                  <div className="aspect-square bg-muted/30 rounded-lg mb-3 flex items-center justify-center p-4">
                    <img src={top.image} alt={top.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-semibold text-center">{top.name}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Bag Bottom Selection */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Bag Bottom</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {bagBottoms.map((bottom) => (
                <button
                  key={bottom.id}
                  onClick={() => setSelectedBottom(bottom.id)}
                  className={`p-4 rounded-xl border-2 transition-all hover:border-primary hover:shadow-lg ${
                    selectedBottom === bottom.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border"
                  }`}
                >
                  <div className="aspect-square bg-muted/30 rounded-lg mb-3 flex items-center justify-center p-4">
                    <img src={bottom.image} alt={bottom.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm font-semibold text-center">{bottom.name}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Fabric Type */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Fabric Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {fabricTypes.map((fabric) => (
                <button
                  key={fabric.id}
                  onClick={() => setSelectedFabric(fabric.id)}
                  className={`p-6 rounded-xl border-2 transition-all hover:border-primary hover:shadow-lg ${
                    selectedFabric === fabric.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border"
                  }`}
                >
                  <p className="font-semibold mb-1">{fabric.name}</p>
                  <p className="text-sm text-muted-foreground">{fabric.gsm}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Liner Options */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Liner Options</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {linerOptions.map((liner) => (
                <button
                  key={liner.id}
                  onClick={() => setSelectedLiner(liner.id)}
                  className={`p-6 rounded-xl border-2 transition-all hover:border-primary hover:shadow-lg ${
                    selectedLiner === liner.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border"
                  }`}
                >
                  <p className="font-semibold">{liner.name}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Capacity */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Capacity</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {capacities.map((capacity) => (
                <button
                  key={capacity.id}
                  onClick={() => setSelectedCapacity(capacity.id)}
                  className={`p-6 rounded-xl border-2 transition-all hover:border-primary hover:shadow-lg ${
                    selectedCapacity === capacity.id
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border"
                  }`}
                >
                  <p className="font-semibold">{capacity.name}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Sticky Bottom Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t shadow-lg z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Construction:</span>
                <span className="font-semibold">{constructionTypes.find(c => c.id === selectedConstruction)?.name}</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Loops:</span>
                <span className="font-semibold">{loopTypes.find(l => l.id === selectedLoop)?.name}</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Top:</span>
                <span className="font-semibold">{bagTops.find(t => t.id === selectedTop)?.name}</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Bottom:</span>
                <span className="font-semibold">{bagBottoms.find(b => b.id === selectedBottom)?.name}</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <div className="h-4 w-px bg-border" />
                <span className="text-muted-foreground">Fabric:</span>
                <span className="font-semibold">{fabricTypes.find(f => f.id === selectedFabric)?.name}</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <div className="h-4 w-px bg-border" />
                <span className="text-muted-foreground">Liner:</span>
                <span className="font-semibold">{linerOptions.find(l => l.id === selectedLiner)?.name}</span>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <div className="h-4 w-px bg-border" />
                <span className="text-muted-foreground">Capacity:</span>
                <span className="font-semibold">{capacities.find(c => c.id === selectedCapacity)?.name}</span>
              </div>
            </div>
            <Button size="lg" onClick={handleRequestQuote} className="shrink-0">
              Request Quote
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuildYourBag;

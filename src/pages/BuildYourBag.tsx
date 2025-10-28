import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BagPreview3D from "@/components/BagPreview3D";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Bag configuration options
const bagTops = [
  { id: "open-top", name: "Open Top", image: "/images/bag-parts/open-top.png" },
  { id: "spout-top", name: "Spout Top", image: "/images/bag-parts/spout-top.png" },
  { id: "flap-top", name: "Flap Top", image: "/images/bag-parts/flap-top.png" },
  { id: "duffle-top", name: "Duffle Top", image: "/images/bag-parts/duffle-top.png" },
];

const loopTypes = [
  { id: "cross-corner", name: "Cross-Corner Loops", image: "/images/bag-parts/loop-cross-corner.png" },
  { id: "corner-seam", name: "Corner Seam Loops", image: "/images/bag-parts/loop-corner-seam.png" },
  { id: "stevedore", name: "Stevedore Strap", image: "/images/bag-parts/loop-stevedore.png" },
  { id: "sleeve", name: "Sleeve Lifts", image: "/images/bag-parts/loop-sleeve.png" },
  { id: "single-point", name: "Single Point", image: "/images/bag-parts/loop-single-point.png" },
];

const bagBottoms = [
  { id: "plain", name: "Plain Bottom", image: "/images/bag-parts/plain-bottom.png" },
  { id: "spout", name: "Spout Bottom", image: "/images/bag-parts/spout-bottom.png" },
  { id: "open", name: "Full Open Bottom", image: "/images/bag-parts/open-bottom.png" },
];

const fabricTypes = [
  { id: "standard", name: "Standard PP", gsm: "150-180 GSM" },
  { id: "coated", name: "Coated Fabric", gsm: "180-200 GSM" },
  { id: "breathable", name: "Breathable", gsm: "160-180 GSM" },
  { id: "food-grade", name: "Food Grade", gsm: "180-220 GSM" },
];

const linerOptions = [
  { id: "none", name: "No Liner" },
  { id: "pe", name: "PE Liner" },
  { id: "aluminum", name: "Aluminum Barrier" },
  { id: "food-safe", name: "Food-Safe Liner" },
];

const capacities = [
  { id: "500", name: "500 kg" },
  { id: "1000", name: "1,000 kg" },
  { id: "1500", name: "1,500 kg" },
  { id: "2000", name: "2,000 kg" },
];

const BuildYourBag = () => {
  const [selectedTop, setSelectedTop] = useState("open-top");
  const [selectedLoop, setSelectedLoop] = useState("cross-corner");
  const [selectedBottom, setSelectedBottom] = useState("plain");
  const [selectedFabric, setSelectedFabric] = useState("standard");
  const [selectedLiner, setSelectedLiner] = useState("none");
  const [selectedCapacity, setSelectedCapacity] = useState("1000");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">Build Your Own FIBC Bag</h1>
          <p className="text-muted-foreground text-lg">
            Customize every aspect of your bulk bag — from top to bottom, loops to liner
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bag Top Selection */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Bag Top</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {bagTops.map((top) => (
                  <button
                    key={top.id}
                    onClick={() => setSelectedTop(top.id)}
                    className={`p-4 rounded-lg border-2 transition-all hover:border-primary ${
                      selectedTop === top.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <div className="aspect-square bg-background rounded mb-2 flex items-center justify-center p-2">
                      <img src={top.image} alt={top.name} className="w-full h-full object-contain" />
                    </div>
                    <p className="text-sm font-medium text-center">{top.name}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Loop Type Selection */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Loops</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {loopTypes.map((loop) => (
                  <button
                    key={loop.id}
                    onClick={() => setSelectedLoop(loop.id)}
                    className={`p-4 rounded-lg border-2 transition-all hover:border-primary ${
                      selectedLoop === loop.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <div className="aspect-square bg-background rounded mb-2 flex items-center justify-center p-2">
                      <img src={loop.image} alt={loop.name} className="w-full h-full object-contain" />
                    </div>
                    <p className="text-sm font-medium text-center">{loop.name}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Bag Bottom Selection */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Bag Bottom</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bagBottoms.map((bottom) => (
                  <button
                    key={bottom.id}
                    onClick={() => setSelectedBottom(bottom.id)}
                    className={`p-4 rounded-lg border-2 transition-all hover:border-primary ${
                      selectedBottom === bottom.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <div className="aspect-square bg-background rounded mb-2 flex items-center justify-center p-2">
                      <img src={bottom.image} alt={bottom.name} className="w-full h-full object-contain" />
                    </div>
                    <p className="text-sm font-medium text-center">{bottom.name}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Fabric Type */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Fabric Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {fabricTypes.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric.id)}
                    className={`p-4 rounded-lg border-2 transition-all hover:border-primary ${
                      selectedFabric === fabric.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <p className="font-medium mb-1">{fabric.name}</p>
                    <p className="text-xs text-muted-foreground">{fabric.gsm}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Liner Options */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Liner Options</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {linerOptions.map((liner) => (
                  <button
                    key={liner.id}
                    onClick={() => setSelectedLiner(liner.id)}
                    className={`p-4 rounded-lg border-2 transition-all hover:border-primary ${
                      selectedLiner === liner.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <p className="font-medium">{liner.name}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Capacity */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Capacity</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {capacities.map((capacity) => (
                  <button
                    key={capacity.id}
                    onClick={() => setSelectedCapacity(capacity.id)}
                    className={`p-4 rounded-lg border-2 transition-all hover:border-primary ${
                      selectedCapacity === capacity.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <p className="font-medium">{capacity.name}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Preview and Summary Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Visual Preview */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Your Bag Preview</h3>
                <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                  <BagPreview3D
                    selectedTop={selectedTop}
                    selectedLoop={selectedLoop}
                    selectedBottom={selectedBottom}
                    selectedFabric={selectedFabric}
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Drag to rotate • Scroll to zoom
                </p>
              </Card>

              {/* Configuration Summary */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Configuration</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Top:</span>
                    <span className="font-medium">
                      {bagTops.find(t => t.id === selectedTop)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loops:</span>
                    <span className="font-medium">
                      {loopTypes.find(l => l.id === selectedLoop)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Bottom:</span>
                    <span className="font-medium">
                      {bagBottoms.find(b => b.id === selectedBottom)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fabric:</span>
                    <span className="font-medium">
                      {fabricTypes.find(f => f.id === selectedFabric)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Liner:</span>
                    <span className="font-medium">
                      {linerOptions.find(l => l.id === selectedLiner)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-medium">
                      {capacities.find(c => c.id === selectedCapacity)?.name}
                    </span>
                  </div>
                </div>
                <Button className="w-full mt-6" size="lg" asChild>
                  <Link to="/contact">Request Quote</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuildYourBag;

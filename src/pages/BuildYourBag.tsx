import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Bag configuration options
const bagTops = [
  { id: "spout", name: "Spout", image: "/images/bag-parts/spout-top.svg" },
  { id: "duffle", name: "Duffle", image: "/images/bag-parts/duffle-top.svg" },
  { id: "oversize-funnel", name: "Oversize Funnel", image: "/images/bag-parts/funnel-top.svg" },
  { id: "flap-cover", name: "Flap Cover", image: "/images/bag-parts/flap-top.svg" },
  { id: "full-open", name: "Full Open", image: "/images/bag-parts/open-top.svg" },
];

const loopTypes = [
  { id: "standard", name: "Standard", image: "/images/bag-parts/loop-standard.svg" },
  { id: "stevedore", name: "Stevedore", image: "/images/bag-parts/loop-stevedore.svg" },
  { id: "union", name: "Union", image: "/images/bag-parts/loop-union.svg" },
  { id: "tunnel", name: "Tunnel", image: "/images/bag-parts/loop-tunnel.svg" },
  { id: "cross-corner", name: "Cross Corner", image: "/images/bag-parts/loop-cross.svg" },
];

const bagBottoms = [
  { id: "spout-bottom", name: "Spout", image: "/images/bag-parts/spout-bottom.svg" },
  { id: "open", name: "Open", image: "/images/bag-parts/open-bottom.svg" },
  { id: "funnel-bottom", name: "Oversize Funnel", image: "/images/bag-parts/funnel-bottom.svg" },
  { id: "diaper", name: "Diaper Bottom", image: "/images/bag-parts/diaper-bottom.svg" },
  { id: "closed", name: "Closed", image: "/images/bag-parts/closed-bottom.svg" },
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
  const [selectedTop, setSelectedTop] = useState("spout");
  const [selectedLoop, setSelectedLoop] = useState("standard");
  const [selectedBottom, setSelectedBottom] = useState("closed");
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
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                    <div className="aspect-square bg-muted rounded mb-2 flex items-center justify-center">
                      <div className="w-12 h-12 bg-foreground/10 rounded"></div>
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
                    <div className="aspect-square bg-muted rounded mb-2 flex items-center justify-center">
                      <div className="w-12 h-12 bg-foreground/10 rounded"></div>
                    </div>
                    <p className="text-sm font-medium text-center">{loop.name}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Bag Bottom Selection */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Bag Bottom</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
                    <div className="aspect-square bg-muted rounded mb-2 flex items-center justify-center">
                      <div className="w-12 h-12 bg-foreground/10 rounded"></div>
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
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-32 h-48 bg-foreground/10 rounded mx-auto mb-4 relative">
                      {/* Simple bag illustration */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-foreground/20 rounded-t"></div>
                      <div className="absolute -bottom-2 left-0 right-0 h-4 bg-foreground/20 rounded-b"></div>
                    </div>
                    <p className="text-sm text-muted-foreground">Safe Packaging</p>
                  </div>
                </div>
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

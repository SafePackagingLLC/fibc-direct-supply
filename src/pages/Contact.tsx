import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Package } from "lucide-react";
import {
  BagConfiguration,
  bagTops,
  loopTypes,
  bagBottoms,
  constructionTypes,
  fabricTypes,
  linerOptions,
  capacities
} from "./BuildYourBag";

interface LocationState {
  bagConfiguration?: BagConfiguration;
}

const Contact = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const bagConfig = state?.bagConfiguration;
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    deliveryRegion: "",
    deliveryDate: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted",
      description: "Thanks! We'll review and reply within 2 business days.",
    });
    setFormData({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      product: "",
      quantity: "",
      deliveryRegion: "",
      deliveryDate: "",
      message: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Request a Quote</h1>
              <p className="text-lg text-muted-foreground">
                Get factory-direct pricing and rapid delivery. Fill out the form below and our team will respond within 2 business days.
              </p>
            </div>

            {/* Your Configuration Box Summary */}
            {bagConfig && (
              <Card className="p-6 mb-8 bg-primary/5 border-primary/20 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Your Configuration</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Construction:</span>
                    <p className="font-semibold text-base">{constructionTypes.find(c => c.id === bagConfig.construction)?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Loops:</span>
                    <p className="font-semibold text-base">{loopTypes.find(l => l.id === bagConfig.loop)?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Top:</span>
                    <p className="font-semibold text-base">{bagTops.find(t => t.id === bagConfig.top)?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Bottom:</span>
                    <p className="font-semibold text-base">{bagBottoms.find(b => b.id === bagConfig.bottom)?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Fabric:</span>
                    <p className="font-semibold text-base">{fabricTypes.find(f => f.id === bagConfig.fabric)?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Liner:</span>
                    <p className="font-semibold text-base">{linerOptions.find(l => l.id === bagConfig.liner)?.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground">Capacity:</span>
                    <p className="font-semibold text-base">{capacities.find(c => c.id === bagConfig.capacity)?.name}</p>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-sm text-muted-foreground">1-800-SAFE-PKG</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-sm text-muted-foreground">sales@safepackaging.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-sm text-muted-foreground">123 Manufacturing Drive<br />Industrial City, USA</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => handleChange("contactPerson", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="product">Product of Interest *</Label>
                  <Select value={formData.product} onValueChange={(value) => handleChange("product", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard FIBC</SelectItem>
                      <SelectItem value="food-pharma">Food & Pharma Grade</SelectItem>
                      <SelectItem value="type-c">Type C Conductive</SelectItem>
                      <SelectItem value="un-certified">UN Certified</SelectItem>
                      <SelectItem value="custom">Custom Solution</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    required
                    placeholder="e.g., 1000 units"
                    value={formData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="deliveryRegion">Required Delivery Region</Label>
                  <Select value={formData.deliveryRegion} onValueChange={(value) => handleChange("deliveryRegion", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="la">Los Angeles, CA</SelectItem>
                      <SelectItem value="houston">Houston, TX</SelectItem>
                      <SelectItem value="chicago">Chicago, IL</SelectItem>
                      <SelectItem value="newark">Newark, NJ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Required Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleChange("deliveryDate", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Additional specifications, questions, or requirements..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Request Quote
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

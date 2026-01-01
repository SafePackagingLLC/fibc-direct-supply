import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Factory, Award, Truck, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">About Safe Packaging</h1>
            <p className="text-lg text-muted-foreground">
              Since 2005, Safe Packaging has been manufacturing high-quality FIBCs for industries across North America. 
              As a direct manufacturer, we control quality at every step — from raw materials to finished products — 
              ensuring you receive factory-direct pricing and rapid delivery from our regional warehouse network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Factory className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Manufacturer</h3>
                <p className="text-sm text-muted-foreground">In-house production with full QA control</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Certified</h3>
                <p className="text-sm text-muted-foreground">ISO certified with full test reports</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">24-72 hour shipping nationwide</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Expert Team</h3>
                <p className="text-sm text-muted-foreground">Dedicated support for your needs</p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Manufacturing Process</h2>
              <p className="text-muted-foreground">
                Every FIBC we produce undergoes rigorous quality control from raw material inspection through final testing. 
                Our state-of-the-art manufacturing facility uses advanced weaving technology and precision cutting to ensure 
                consistent quality and adherence to international safety standards.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Regional Warehouse Network</h2>
              <p className="text-muted-foreground">
                To serve our customers better, we maintain strategically located warehouses in Los Angeles, Houston, Chicago, 
                and Newark. This network allows us to provide rapid 24-72 hour delivery to most locations across the United States, 
                reducing lead times and ensuring you have the materials you need when you need them.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Commitment to Quality</h2>
              <p className="text-muted-foreground">
                Quality isn't just a goal — it's our standard. We maintain ISO certification and can provide complete test 
                reports and certificates for every product. Our bags meet or exceed industry standards for food-grade, 
                pharmaceutical, and hazardous material applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

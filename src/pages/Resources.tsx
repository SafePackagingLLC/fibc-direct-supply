import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResourceCard from "@/components/ResourceCard";

const Resources = () => {
  const resources = [
    {
      title: "What is an FIBC?",
      description: "A comprehensive introduction to Flexible Intermediate Bulk Containers and their applications.",
      slug: "what-is-fibc"
    },
    {
      title: "How to Choose an FIBC for Your Material",
      description: "Expert guidance on selecting the right bulk bag based on material type, flow characteristics, and industry requirements.",
      slug: "choose-fibc"
    },
    {
      title: "FIBC Liner Types Explained",
      description: "Compare PE, EVOH, and laminated liners to find the best moisture and contamination protection.",
      slug: "liner-types"
    },
    {
      title: "Our QA & Testing Process",
      description: "Learn about our factory testing procedures and how we ensure every bag meets certification standards.",
      slug: "qa-testing"
    },
    {
      title: "Delivery & Logistics",
      description: "Understand how our local warehousing network enables rapid 24-72 hour delivery nationwide.",
      slug: "delivery-logistics"
    },
    {
      title: "Customization & Lead Times",
      description: "Get fast custom orders with our streamlined manufacturing process and flexible production scheduling.",
      slug: "customization"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">FIBC Knowledge Center</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome to the FIBC Knowledge Center. Practical guides, spec sheets, and safety information from the manufacturer to help you choose the right bag, understand testing, and speed up procurement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <ResourceCard key={resource.slug} {...resource} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;

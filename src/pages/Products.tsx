import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productStandard from "@/assets/product-standard-fibc.jpg";
import productFoodGrade from "@/assets/product-food-grade.jpg";

const Products = () => {
  const products = [
    {
      title: "Standard FIBC",
      description: "General-purpose bulk bags for industrial applications",
      specs: "1,000-2,000 kg capacity • 150-200 GSM • Multiple liner options",
      image: productStandard,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "standard-fibc"
    },
    {
      title: "Food & Pharma Grade FIBC",
      description: "FDA-compliant bags for food and pharmaceutical products",
      specs: "500-1,500 kg capacity • Food-safe liners • Full certification",
      image: productFoodGrade,
      stockStatus: "In Stock — Ships 24-72 hrs",
      slug: "food-pharma-fibc"
    },
    {
      title: "Type C Conductive FIBC",
      description: "Electrostatic protection for flammable materials",
      specs: "1,000-1,500 kg capacity • Conductive threads • Grounding required",
      image: productStandard,
      stockStatus: "Contact for availability",
      slug: "type-c-fibc"
    },
    {
      title: "UN Certified FIBC",
      description: "Certified for hazardous materials transport",
      specs: "500-2,000 kg capacity • UN certification • Multiple safety factors",
      image: productFoodGrade,
      stockStatus: "Contact for availability",
      slug: "un-certified-fibc"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Factory-direct FIBCs manufactured to your specifications. All products are stocked in regional warehouses for rapid delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;

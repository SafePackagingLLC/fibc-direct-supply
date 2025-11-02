import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import productStandard from "@/assets/product-standard-fibc.jpg";
import productFoodGrade from "@/assets/product-food-grade.jpg";

interface Product {
  title: string;
  description: string;
  specs: string;
  image: string;
  stockStatus: string;
  slug: string;
}

interface Industry {
  name: string;
  description: string;
  products: Product[];
  bgClass: string;
}

const Products = () => {
  const industries: Industry[] = [
    {
      name: "Agriculture",
      description: "Solutions for grains, seeds, fertilizers, and animal feed",
      bgClass: "bg-background",
      products: [
        {
          title: "Standard FIBC Bag",
          description: "General-purpose bulk bags for agricultural products",
          specs: "1,000–2,000 kg capacity • 160–200 GSM • 4 lifting loops • UV stabilized • Optional PE liner",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "standard-fibc"
        },
        {
          title: "Ventilated FIBC Bag",
          description: "Enhanced airflow for perishable agricultural products",
          specs: "500–1,000 kg capacity • 160–180 GSM • Ventilation strips • 4 lifting loops • Enhanced airflow",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "ventilated-fibc"
        },
        {
          title: "Baffle FIBC Bag",
          description: "Stackable bags maintaining cubic shape for efficient storage",
          specs: "1,000–1,500 kg capacity • 180–200 GSM • Internal baffles • Maintains cubic shape • Optimized stacking",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "baffle-fibc"
        }
      ]
    },
    {
      name: "Chemicals",
      description: "Safe handling solutions for powdered and granular chemicals",
      bgClass: "bg-muted",
      products: [
        {
          title: "Type B Antistatic FIBC",
          description: "Prevents spark discharges for flammable powders",
          specs: "500–1,500 kg capacity • 180–200 GSM • Low breakdown voltage • Prevents spark discharges • 4 lifting loops",
          image: productStandard,
          stockStatus: "Contact for availability",
          slug: "type-b-antistatic-fibc"
        },
        {
          title: "Type C Conductive FIBC",
          description: "Safe handling of flammable chemicals with grounding",
          specs: "1,000–1,500 kg capacity • 200–220 GSM • Conductive threads • Requires grounding • Flammable powder safe",
          image: productStandard,
          stockStatus: "Contact for availability",
          slug: "type-c-conductive-fibc"
        },
        {
          title: "Type D Static Dissipative FIBC",
          description: "Static dissipation without grounding requirements",
          specs: "500–1,500 kg capacity • 180–200 GSM • No grounding required • Static dissipative • Safe for hazardous environments",
          image: productStandard,
          stockStatus: "Contact for availability",
          slug: "type-d-static-dissipative-fibc"
        }
      ]
    },
    {
      name: "Construction",
      description: "Heavy-duty solutions for cement, sand, gravel, and aggregates",
      bgClass: "bg-background",
      products: [
        {
          title: "Standard Construction FIBC",
          description: "Durable bags for heavy construction materials",
          specs: "1,000–2,000 kg capacity • 180–220 GSM • Heavy-duty fabric • 4 corner loops • UV stabilized",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "standard-construction-fibc"
        },
        {
          title: "Circular/Tubular FIBC",
          description: "Seamless design for fine materials",
          specs: "1,000–2,000 kg capacity • 180–200 GSM • Seamless body • Ideal for fine materials • Reduced rupture risk",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "circular-tubular-fibc"
        },
        {
          title: "Baffle FIBC Bag",
          description: "Optimized for cement and fly ash storage",
          specs: "1,000–1,500 kg capacity • 200–220 GSM • Internal baffles • Cubic shape • Optimized for cement & fly ash",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "baffle-construction-fibc"
        }
      ]
    },
    {
      name: "Food Processing",
      description: "FDA-compliant bags for food ingredients and bulk products",
      bgClass: "bg-muted",
      products: [
        {
          title: "Food-Grade FIBC Bag",
          description: "Hygienic bulk storage for food products",
          specs: "500–1,500 kg capacity • 160–180 GSM • FDA-compliant • Cleanroom manufactured • Food-safe PE liner",
          image: productFoodGrade,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "food-grade-fibc"
        },
        {
          title: "Baffle Food-Grade FIBC",
          description: "Stackable food-safe bags with cubic shape",
          specs: "1,000–1,500 kg capacity • 180–200 GSM • Internal baffles • Food-grade liner • Cubic shape for stacking",
          image: productFoodGrade,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "baffle-food-grade-fibc"
        }
      ]
    },
    {
      name: "Pharmaceuticals",
      description: "Pharmaceutical-grade solutions for APIs and excipients",
      bgClass: "bg-background",
      products: [
        {
          title: "Pharmaceutical-Grade FIBC",
          description: "Contamination-free transport for active ingredients",
          specs: "500–1,000 kg capacity • 160–180 GSM • Cleanroom manufactured • GMP-compliant • Pharma-grade liner",
          image: productFoodGrade,
          stockStatus: "Contact for availability",
          slug: "pharmaceutical-grade-fibc"
        },
        {
          title: "Type D Static Dissipative FIBC",
          description: "Safe handling of pharmaceutical powders without grounding",
          specs: "500–1,500 kg capacity • 180–200 GSM • No grounding required • Static dissipative • Safe for APIs",
          image: productFoodGrade,
          stockStatus: "Contact for availability",
          slug: "type-d-pharma-fibc"
        }
      ]
    },
    {
      name: "Recycling",
      description: "Durable solutions for recyclable materials and waste management",
      bgClass: "bg-muted",
      products: [
        {
          title: "Standard FIBC Bag",
          description: "Versatile bags for recycling operations",
          specs: "500–1,500 kg capacity • 160–180 GSM • 4 corner loops • Durable construction • Reusable",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "standard-recycling-fibc"
        },
        {
          title: "Ventilated FIBC Bag",
          description: "Airflow for organic waste recycling",
          specs: "500–1,000 kg capacity • 160–180 GSM • Ventilation strips • Airflow for organic materials • 4 lifting loops",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "ventilated-recycling-fibc"
        }
      ]
    },
    {
      name: "Minerals",
      description: "Heavy-duty bags for ores, coal, and mineral powders",
      bgClass: "bg-background",
      products: [
        {
          title: "Heavy-Duty FIBC Bag",
          description: "Extra strength for abrasive mineral loads",
          specs: "1,000–2,000 kg capacity • 200–240 GSM • High GSM fabric • Reinforced loops • Abrasion resistant",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "heavy-duty-minerals-fibc"
        },
        {
          title: "Circular/Tubular FIBC",
          description: "Seamless design for fine mineral powders",
          specs: "1,000–2,000 kg capacity • 180–200 GSM • Seamless body • Ideal for fine mineral powders • Reduced leakage",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "circular-minerals-fibc"
        },
        {
          title: "Baffle FIBC Bag",
          description: "Optimized storage for mineral concentrates",
          specs: "1,000–1,500 kg capacity • 200–220 GSM • Internal baffles • Cubic shape • Optimized storage",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "baffle-minerals-fibc"
        }
      ]
    },
    {
      name: "Fertilizers",
      description: "Moisture-resistant solutions for granular and powdered fertilizers",
      bgClass: "bg-muted",
      products: [
        {
          title: "Standard FIBC Bag",
          description: "Reliable bulk storage for fertilizer products",
          specs: "1,000–1,500 kg capacity • 160–200 GSM • UV stabilized • 4 corner loops • Optional PE liner",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "standard-fertilizer-fibc"
        },
        {
          title: "Lined FIBC Bag",
          description: "Maximum moisture protection for hygroscopic fertilizers",
          specs: "500–1,500 kg capacity • 160–180 GSM • PE liner • Moisture protection • Ideal for hygroscopic fertilizers",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "lined-fertilizer-fibc"
        }
      ]
    },
    {
      name: "Cement & Color Pigments",
      description: "Specialized bags for fine powders and bulk cement",
      bgClass: "bg-background",
      products: [
        {
          title: "Circular/Tubular FIBC",
          description: "Seamless design minimizes dust leakage",
          specs: "1,000–2,000 kg capacity • 180–200 GSM • Seamless body • Ideal for cement & pigments • Minimizes dust leakage",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "circular-cement-fibc"
        },
        {
          title: "Baffle FIBC Bag",
          description: "Optimal stacking for cement and pigment storage",
          specs: "1,000–1,500 kg capacity • 200–220 GSM • Internal baffles • Cubic shape • Optimized for fine powders",
          image: productStandard,
          stockStatus: "In Stock — Ships 24-72 hrs",
          slug: "baffle-cement-fibc"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Factory-direct FIBCs manufactured to your specifications. All products are stocked in regional warehouses for rapid delivery.
            </p>
            <Button size="lg" asChild>
              <Link to="/build-your-bag">Build Your Own Bag</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Industry Sections */}
      {industries.map((industry, index) => (
        <section key={industry.name} className={`py-16 ${industry.bgClass}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">{industry.name}</h2>
            <p className="text-lg text-muted-foreground mb-8">{industry.description}</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.products.map((product) => (
                <ProductCard key={product.slug} {...product} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
};

export default Products;

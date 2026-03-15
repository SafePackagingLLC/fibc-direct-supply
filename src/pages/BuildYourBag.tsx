import { useEffect, useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteWizard from "@/components/quote/QuoteWizard";
import QuoteSidebar from "@/components/quote/QuoteSidebar";
import QuoteMobileBar from "@/components/quote/QuoteMobileBar";
import QuoteLeadForm from "@/components/quote/QuoteLeadForm";
import QuoteConfirmation from "@/components/quote/QuoteConfirmation";
import { QuoteContext } from "@/hooks/useQuoteConfig";
import { useQuoteConfig } from "@/hooks/useQuoteConfig";
import { useQuoteSubmit } from "@/hooks/useQuoteSubmit";
import { useQuoteAnalytics } from "@/hooks/useQuoteAnalytics";
import type { LeadData } from "@/types/quote";
import { DEFAULT_CONFIG } from "@/types/quote";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    q: "How accurate is the price estimate?",
    a: "The estimate is within ±13% of the final price for most standard configurations. Custom dimensions, special certifications, and rush orders may affect pricing.",
  },
  {
    q: "What is the minimum order quantity?",
    a: "Our minimum order is typically 100 units for standard bags and 500 units for specialized configurations (Type C/D, UN certified, pharmaceutical grade).",
  },
  {
    q: "How long does manufacturing take?",
    a: "Standard in-stock configurations ship within 24–72 hours from our regional warehouses. Custom configurations typically require 3–6 weeks production time.",
  },
  {
    q: "Do you offer samples before a full order?",
    a: "Yes — we can ship a sample bag for evaluation before committing to a full production run. Contact our sales team to request samples.",
  },
  {
    q: "What is the difference between safety factors 5:1 and 6:1?",
    a: "A 5:1 safety factor bag is rated for single-trip use. A 6:1 safety factor bag is built for multiple trips and is constructed with heavier fabric and reinforced seams.",
  },
  {
    q: "What does 'Type C' or 'Type D' antistatic mean?",
    a: "Type C bags use conductive threads woven into the fabric and must be grounded during use. Type D bags are static-dissipative and require no grounding cable — safer for most environments.",
  },
  {
    q: "Can I get a bag certified to UN standards?",
    a: "Yes — select 'UN Certified' in the Extras step. UN certification is required for transport of certain hazardous materials and adds testing and documentation to the order.",
  },
  {
    q: "What payment terms are available?",
    a: "We offer net-30 terms for established customers and 50% deposit / 50% on shipment for new customers. Wire transfer, ACH, and major credit cards are accepted.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

type PageStage = "wizard" | "lead-form" | "confirmation";

function BuildYourBagInner() {
  const quoteState = useQuoteConfig();
  const { submit, status, setStatus } = useQuoteSubmit();
  const [stage, setStage] = useState<PageStage>("wizard");
  const { trackStep, trackSubmit } = useQuoteAnalytics(quoteState.config, stage === "lead-form" ? 13 : stage === "confirmation" ? 13 : 0);

  // SEO
  useEffect(() => {
    document.title = "FIBC Bulk Bag Pricing | Build & Price Your Bag — Safe Packaging";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Configure your custom FIBC bulk bag and get an instant transparent price estimate. Choose construction, dimensions, SWL, liner, printing and more."
      );
    }

    // JSON-LD
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "quote-jsonld";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "FIBC Bag Price Configurator",
      description: "Configure and price your custom FIBC bulk bag instantly.",
      applicationCategory: "BusinessApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    });
    if (!document.getElementById("quote-jsonld")) {
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById("quote-jsonld")?.remove();
    };
  }, []);

  const contextValue = useMemo(
    () => quoteState,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [quoteState.config, quoteState.priceResult, quoteState.warnings]
  );

  async function handleLeadSubmit(lead: LeadData) {
    trackSubmit();
    await submit(quoteState.config, lead, quoteState.priceResult);
    // Show confirmation regardless of email success/failure
    setStage("confirmation");
  }

  function handleReset() {
    setStage("wizard");
    setStatus("idle");
  }

  return (
    <QuoteContext.Provider value={contextValue}>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="py-10 bg-amber-500/5 border-b">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Build &amp; Price Your FIBC Bag
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
              Configure every specification below — your estimated price updates in real time in the sidebar. No sales call needed.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 pb-24 md:pb-10">
          {stage === "wizard" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <QuoteWizard onComplete={() => setStage("lead-form")} />
              </div>
              <div className="hidden lg:block">
                <QuoteSidebar />
              </div>
            </div>
          )}

          {stage === "lead-form" && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="border rounded-xl p-6 bg-card">
                  <QuoteLeadForm onSubmit={handleLeadSubmit} isSubmitting={status === "submitting"} />
                </div>
              </div>
              <div className="hidden lg:block">
                <QuoteSidebar />
              </div>
            </div>
          )}

          {stage === "confirmation" && (
            <div className="max-w-2xl mx-auto">
              <div className="border rounded-xl p-6 bg-card">
                <QuoteConfirmation onReset={handleReset} />
              </div>
            </div>
          )}

          {/* FAQ */}
          {stage !== "confirmation" && (
            <section className="mt-16 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {FAQ.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-3">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}
        </div>

        <QuoteMobileBar />
        <Footer />
      </div>
    </QuoteContext.Provider>
  );
}

// Wrap with Suspense boundary for useSearchParams
const BuildYourBag = () => <BuildYourBagInner />;

export default BuildYourBag;

// ─── Legacy exports (for Contact.tsx backward compat) ────────────────────────
// Contact.tsx has been updated to use new types — these are kept for any other imports.
export type { QuoteConfig as BagConfiguration } from "@/types/quote";

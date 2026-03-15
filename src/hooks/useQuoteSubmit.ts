import { useState } from "react";
import emailjs from "@emailjs/browser";
import type { QuoteConfig, LeadData, PriceResult } from "@/types/quote";
import { formatPriceRange } from "@/lib/pricing";
import { PRICING_CONFIG } from "@/data/pricingConfig";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

function buildConfigSummary(config: QuoteConfig): string {
  const lines = [
    `Construction: ${PRICING_CONFIG.construction[config.construction as keyof typeof PRICING_CONFIG.construction]?.label ?? config.construction}`,
    `Dimensions: ${config.dimensions.mode === "preset" ? (PRICING_CONFIG.dimensions.presets.find((p) => p.id === config.dimensions.presetId)?.label ?? config.dimensions.presetId) : "Custom"}`,
    `SWL: ${config.swl.lbs} lbs (SF ${config.swl.safetyFactor})`,
    `Static Protection: ${PRICING_CONFIG.staticProtection[config.staticProtection as keyof typeof PRICING_CONFIG.staticProtection]?.label ?? config.staticProtection}`,
    `Fabric: ${config.fabricGsm === "220plus" ? "220+ GSM" : `${config.fabricGsm} GSM`}`,
    `Coating: ${PRICING_CONFIG.coating[config.coating as keyof typeof PRICING_CONFIG.coating]?.label ?? config.coating}`,
    `Top: ${PRICING_CONFIG.top[config.top.type as keyof typeof PRICING_CONFIG.top] && "label" in PRICING_CONFIG.top[config.top.type as keyof typeof PRICING_CONFIG.top] ? (PRICING_CONFIG.top[config.top.type as keyof typeof PRICING_CONFIG.top] as { label: string }).label : config.top.type}`,
    `Bottom: ${PRICING_CONFIG.bottom[config.bottom.type as keyof typeof PRICING_CONFIG.bottom] && "label" in PRICING_CONFIG.bottom[config.bottom.type as keyof typeof PRICING_CONFIG.bottom] ? (PRICING_CONFIG.bottom[config.bottom.type as keyof typeof PRICING_CONFIG.bottom] as { label: string }).label : config.bottom.type}`,
    `Liner: ${PRICING_CONFIG.liner[config.liner as keyof typeof PRICING_CONFIG.liner]?.label ?? config.liner}`,
    `Loops: ${PRICING_CONFIG.loops[config.loops.type as keyof typeof PRICING_CONFIG.loops]?.label ?? config.loops.type}`,
    `Printing: ${config.printing.type === "none" ? "None" : config.printing.type}`,
    `Quantity: ${config.quantity.toLocaleString()}`,
  ];

  const activeExtras = Object.entries(config.extras)
    .filter(([, v]) => v)
    .map(([k]) => PRICING_CONFIG.extras[k as keyof typeof PRICING_CONFIG.extras]?.label ?? k);
  if (activeExtras.length) {
    lines.push(`Extras: ${activeExtras.join(", ")}`);
  }

  return lines.join("\n");
}

export function useQuoteSubmit() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function submit(config: QuoteConfig, lead: LeadData, priceResult: PriceResult) {
    setStatus("submitting");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const ownerTemplate = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID;
    const buyerTemplate = import.meta.env.VITE_EMAILJS_BUYER_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    const configSummary = buildConfigSummary(config);
    const priceRange = formatPriceRange(priceResult.lowPrice, priceResult.highPrice);

    const commonVars = {
      company_name: lead.companyName,
      contact_name: lead.contactName,
      email: lead.email,
      phone: lead.phone,
      delivery_region: lead.deliveryRegion,
      delivery_date: lead.deliveryDate ?? "Not specified",
      message: lead.message ?? "",
      config_summary: configSummary,
      price_range: priceRange,
      quantity: config.quantity.toLocaleString(),
    };

    try {
      await Promise.all([
        serviceId && ownerTemplate && publicKey
          ? emailjs.send(serviceId, ownerTemplate, commonVars, publicKey)
          : Promise.resolve(),
        serviceId && buyerTemplate && publicKey
          ? emailjs.send(serviceId, buyerTemplate, { ...commonVars, to_email: lead.email }, publicKey)
          : Promise.resolve(),
      ]);
      setStatus("success");
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  }

  return { submit, status, setStatus };
}

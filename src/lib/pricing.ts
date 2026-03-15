import { PRICING_CONFIG } from "@/data/pricingConfig";
import type { QuoteConfig, PriceResult, PriceLineItem, FabricGsm } from "@/types/quote";

export function formatPrice(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
}

export function formatPriceRange(low: number, high: number): string {
  return `${formatPrice(low)} – ${formatPrice(high)}`;
}

export function getVolumeTier(qty: number): { multiplier: number; label: string } {
  const tier = PRICING_CONFIG.volumeMultipliers.find(
    (t) => qty >= t.min && (t.max === null || qty <= t.max)
  );
  return tier ?? { multiplier: 1.0, label: "Custom" };
}

function getDimensionAdder(config: QuoteConfig): number {
  if (config.dimensions.mode === "preset") {
    const preset = PRICING_CONFIG.dimensions.presets.find((p) => p.id === config.dimensions.presetId);
    return preset ? preset.adder : 0;
  }
  // Custom: calculate fabric area
  const cd = config.dimensions.custom;
  if (!cd) return 0;
  let l = cd.length, w = cd.width, h = cd.height;
  if (cd.unit === "cm") {
    // convert cm to inches (1 in = 2.54 cm)
    l = l / 2.54;
    w = w / 2.54;
    h = h / 2.54;
  }
  const areaInSqIn = 2 * (l * h) + 2 * (w * h) + 2 * (l * w);
  return areaInSqIn * PRICING_CONFIG.dimensions.customPricePerSqIn;
}

function getFabricGsmKey(gsm: FabricGsm): keyof typeof PRICING_CONFIG.fabricWeight {
  return gsm as keyof typeof PRICING_CONFIG.fabricWeight;
}

export function calculatePrice(config: QuoteConfig): PriceResult {
  const lineItems: PriceLineItem[] = [];
  const cfg = PRICING_CONFIG;

  // Construction base
  const constructionKey = config.construction as keyof typeof cfg.construction;
  const constructionBase = cfg.construction[constructionKey]?.basePrice ?? 0;
  lineItems.push({ label: cfg.construction[constructionKey]?.label ?? config.construction, amount: constructionBase });

  // Dimensions
  const dimAdder = getDimensionAdder(config);
  if (dimAdder > 0) {
    const dimLabel = config.dimensions.mode === "preset"
      ? PRICING_CONFIG.dimensions.presets.find((p) => p.id === config.dimensions.presetId)?.label ?? "Dimensions"
      : "Custom Dimensions";
    lineItems.push({ label: dimLabel, amount: dimAdder });
  }

  // SWL
  const swlTier = cfg.swl.tiers.find(
    (t) => t.lbs === config.swl.lbs && t.safetyFactor === config.swl.safetyFactor
  );
  const swlAdder = swlTier?.adder ?? 0;
  if (swlAdder > 0) {
    lineItems.push({ label: `SWL ${config.swl.lbs} lbs (${config.swl.safetyFactor})`, amount: swlAdder });
  }

  // Static protection
  const staticKey = config.staticProtection as keyof typeof cfg.staticProtection;
  const staticAdder = cfg.staticProtection[staticKey]?.adder ?? 0;
  if (staticAdder > 0) {
    lineItems.push({ label: cfg.staticProtection[staticKey]?.label, amount: staticAdder });
  }

  // Fabric GSM
  const gsmKey = getFabricGsmKey(config.fabricGsm);
  const gsmAdder = (cfg.fabricWeight as Record<string, { adder: number }>)[String(gsmKey)]?.adder ?? 0;
  if (gsmAdder > 0) {
    const gsmLabel = gsmKey === "220plus" ? "220+ GSM Fabric" : `${gsmKey} GSM Fabric`;
    lineItems.push({ label: gsmLabel, amount: gsmAdder });
  }

  // Coating
  const coatingKey = config.coating as keyof typeof cfg.coating;
  const coatingAdder = cfg.coating[coatingKey]?.adder ?? 0;
  if (coatingAdder > 0) {
    lineItems.push({ label: cfg.coating[coatingKey]?.label, amount: coatingAdder });
  }

  // Top
  const topKey = config.top.type as keyof typeof cfg.top;
  const topObj = cfg.top[topKey] as { adder: number; label: string } | undefined;
  const topAdder = topObj?.adder ?? 0;
  if (topAdder > 0) {
    lineItems.push({ label: topObj?.label ?? config.top.type, amount: topAdder });
  }
  // Top spout diameter
  if (config.top.type === "spout" && config.top.spoutDiameter) {
    const topSpoutAdder = cfg.top.spoutDiameters[config.top.spoutDiameter as keyof typeof cfg.top.spoutDiameters]?.adder ?? 0;
    if (topSpoutAdder > 0) {
      lineItems.push({ label: `Top Spout ${config.top.spoutDiameter}`, amount: topSpoutAdder });
    }
  }

  // Bottom
  const botKey = config.bottom.type as keyof typeof cfg.bottom;
  const botObj = cfg.bottom[botKey] as { adder: number; label: string } | undefined;
  const botAdder = botObj?.adder ?? 0;
  if (botAdder > 0) {
    lineItems.push({ label: botObj?.label ?? config.bottom.type, amount: botAdder });
  }
  // Bottom spout diameter
  if (config.bottom.type === "spout" && config.bottom.spoutDiameter) {
    const botSpoutAdder = cfg.bottom.spoutDiameters[config.bottom.spoutDiameter as keyof typeof cfg.bottom.spoutDiameters]?.adder ?? 0;
    if (botSpoutAdder > 0) {
      lineItems.push({ label: `Bottom Spout ${config.bottom.spoutDiameter}`, amount: botSpoutAdder });
    }
  }

  // Liner
  const linerKey = config.liner as keyof typeof cfg.liner;
  const linerAdder = cfg.liner[linerKey]?.adder ?? 0;
  if (linerAdder > 0) {
    lineItems.push({ label: cfg.liner[linerKey]?.label, amount: linerAdder });
  }

  // Loops
  const loopKey = config.loops.type as keyof typeof cfg.loops;
  const loopAdder = cfg.loops[loopKey]?.adder ?? 0;
  if (loopAdder > 0) {
    lineItems.push({ label: cfg.loops[loopKey]?.label, amount: loopAdder });
  }

  // Printing
  const printKey = config.printing.type as keyof Omit<typeof cfg.printing, "plateCharge">;
  const printObj = cfg.printing[printKey] as { adder: number } | undefined;
  const printAdder = printObj?.adder ?? 0;
  if (printAdder > 0) {
    const printLabels: Record<string, string> = {
      "1c1s": "Print: 1 Color, 1 Side",
      "1c2s": "Print: 1 Color, 2 Sides",
      "2c1s": "Print: 2 Colors, 1 Side",
      "2c2s": "Print: 2 Colors, 2 Sides",
      "full": "Print: Full Color",
    };
    lineItems.push({ label: printLabels[config.printing.type] ?? "Printing", amount: printAdder });
  }

  // Plate charge (one-time)
  if (config.printing.type !== "none" && cfg.printing.plateCharge > 0) {
    lineItems.push({ label: "Plate Charge (one-time)", amount: cfg.printing.plateCharge, oneTime: true });
  }

  // Extras
  for (const [key, enabled] of Object.entries(config.extras)) {
    if (!enabled) continue;
    const extraKey = key as keyof typeof cfg.extras;
    const extra = cfg.extras[extraKey];
    if (extra && extra.adder > 0) {
      lineItems.push({ label: extra.label, amount: extra.adder });
    }
  }

  // Sum per-bag adders (exclude one-time)
  const perBagBase = lineItems
    .filter((li) => !li.oneTime)
    .reduce((sum, li) => sum + li.amount, 0);

  const tier = getVolumeTier(config.quantity);
  const midPrice = perBagBase * tier.multiplier;
  const margin = cfg.meta.rangeMargin;
  const lowPrice = midPrice * (1 - margin);
  const highPrice = midPrice * (1 + margin);

  return {
    midPrice,
    lowPrice,
    highPrice,
    perBag: midPrice,
    lineItems,
    volumeMultiplier: tier.multiplier,
    volumeTierLabel: tier.label,
    quantity: config.quantity,
  };
}

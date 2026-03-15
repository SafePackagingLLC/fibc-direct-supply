import type { QuoteConfig, ConstructionType, StaticProtection, TopType, BottomType, LinerType, FabricGsm, SafetyFactor } from "@/types/quote";
import { DEFAULT_CONFIG } from "@/types/quote";
import { PRICING_CONFIG } from "@/data/pricingConfig";

const VALID_CONSTRUCTION: ConstructionType[] = ["circular", "upanel", "4panel", "baffled"];
const VALID_TOP: TopType[] = ["open", "spout", "duffle", "closed"];
const VALID_BOTTOM: BottomType[] = ["flat", "spout", "fullOpen"];
const VALID_LINER: LinerType[] = ["none", "pe", "foil", "formFit"];
const VALID_GSM_MAP: Record<string, FabricGsm> = {
  "140": 140, "150": 150, "160": 150, "170": 170, "180": 180, "200": 200, "220": "220plus",
};
const STATIC_MAP: Record<string, StaticProtection> = {
  a: "typeA", b: "typeB", c: "typeC", d: "typeD",
};

export function parseUrlParams(params: URLSearchParams): Partial<QuoteConfig> {
  const partial: Partial<QuoteConfig> = {};

  const type = params.get("type");
  if (type && VALID_CONSTRUCTION.includes(type as ConstructionType)) {
    partial.construction = type as ConstructionType;
  }

  const dims = params.get("dims");
  if (dims) {
    const presetIds = PRICING_CONFIG.dimensions.presets.map((p) => p.id);
    if (presetIds.includes(dims)) {
      partial.dimensions = { mode: "preset", presetId: dims };
    }
  }

  const swl = params.get("swl");
  const sf = params.get("sf");
  if (swl) {
    const lbs = parseInt(swl, 10);
    const safetyFactor: SafetyFactor = sf === "6" ? "6:1" : "5:1";
    if (!isNaN(lbs)) {
      partial.swl = { lbs, safetyFactor };
    }
  }

  const gsm = params.get("gsm");
  if (gsm && VALID_GSM_MAP[gsm]) {
    partial.fabricGsm = VALID_GSM_MAP[gsm];
  }

  const top = params.get("top");
  if (top && VALID_TOP.includes(top as TopType)) {
    partial.top = { type: top as TopType };
  }

  const bottom = params.get("bottom");
  if (bottom && VALID_BOTTOM.includes(bottom as BottomType)) {
    partial.bottom = { type: bottom as BottomType };
  }

  const liner = params.get("liner");
  if (liner && VALID_LINER.includes(liner as LinerType)) {
    partial.liner = liner as LinerType;
  }

  const staticType = params.get("static");
  if (staticType && STATIC_MAP[staticType]) {
    partial.staticProtection = STATIC_MAP[staticType];
  }

  const qty = params.get("qty");
  if (qty) {
    const q = parseInt(qty, 10);
    if (!isNaN(q) && q > 0) {
      partial.quantity = q;
    }
  }

  const extras = params.get("extras");
  if (extras) {
    const keys = extras.split(",").filter(Boolean);
    const extrasObj: Record<string, boolean> = {};
    for (const k of keys) {
      extrasObj[k] = true;
    }
    if (Object.keys(extrasObj).length > 0) {
      partial.extras = extrasObj;
    }
  }

  return partial;
}

export function buildQuoteUrl(config: Partial<QuoteConfig>): string {
  const params = new URLSearchParams();
  if (config.construction) params.set("type", config.construction);
  if (config.dimensions?.presetId) params.set("dims", config.dimensions.presetId);
  if (config.swl) {
    params.set("swl", String(config.swl.lbs));
    params.set("sf", config.swl.safetyFactor === "6:1" ? "6" : "5");
  }
  if (config.fabricGsm) params.set("gsm", String(config.fabricGsm === "220plus" ? "220" : config.fabricGsm));
  if (config.top?.type) params.set("top", config.top.type);
  if (config.bottom?.type) params.set("bottom", config.bottom.type);
  if (config.liner && config.liner !== "none") params.set("liner", config.liner);
  if (config.staticProtection) {
    const revMap: Record<StaticProtection, string> = { typeA: "a", typeB: "b", typeC: "c", typeD: "d" };
    params.set("static", revMap[config.staticProtection]);
  }
  if (config.quantity) params.set("qty", String(config.quantity));
  if (config.extras) {
    const keys = Object.entries(config.extras)
      .filter(([, v]) => v)
      .map(([k]) => k);
    if (keys.length) params.set("extras", keys.join(","));
  }
  return `/build-your-bag?${params.toString()}`;
}

export function mergeWithDefaults(partial: Partial<QuoteConfig>): QuoteConfig {
  return {
    ...DEFAULT_CONFIG,
    ...partial,
    dimensions: partial.dimensions ?? DEFAULT_CONFIG.dimensions,
    swl: partial.swl ?? DEFAULT_CONFIG.swl,
    top: partial.top ?? DEFAULT_CONFIG.top,
    bottom: partial.bottom ?? DEFAULT_CONFIG.bottom,
    loops: partial.loops ?? DEFAULT_CONFIG.loops,
    printing: partial.printing ?? DEFAULT_CONFIG.printing,
    extras: partial.extras ?? DEFAULT_CONFIG.extras,
  };
}

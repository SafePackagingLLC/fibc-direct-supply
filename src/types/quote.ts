// ─── Core Config ──────────────────────────────────────────────────────────────

export type ConstructionType = "circular" | "upanel" | "4panel" | "baffled";
export type DimensionMode = "preset" | "custom";
export type StaticProtection = "typeA" | "typeB" | "typeC" | "typeD";
export type CoatingType = "none" | "inside" | "outside" | "both";
export type TopType = "open" | "duffle" | "spout" | "closed";
export type BottomType = "flat" | "spout" | "fullOpen";
export type LinerType = "none" | "pe" | "foil" | "formFit";
export type LoopType = "crossCorner" | "sideSeam" | "twoLoop" | "sleeve";
export type PrintingType = "none" | "1c1s" | "1c2s" | "2c1s" | "2c2s" | "full";
export type SpoutDiameter = "12in" | "14in" | "16in" | "18in";
export type FabricGsm = 140 | 150 | 170 | 180 | 200 | "220plus";
export type SafetyFactor = "5:1" | "6:1";

export interface CustomDimensions {
  length: number;
  width: number;
  height: number;
  unit: "in" | "cm";
}

export interface QuoteConfig {
  construction: ConstructionType;
  dimensions: {
    mode: DimensionMode;
    presetId?: string;
    custom?: CustomDimensions;
  };
  swl: {
    lbs: number;
    safetyFactor: SafetyFactor;
  };
  staticProtection: StaticProtection;
  fabricGsm: FabricGsm;
  coating: CoatingType;
  top: {
    type: TopType;
    spoutDiameter?: SpoutDiameter;
  };
  bottom: {
    type: BottomType;
    spoutDiameter?: SpoutDiameter;
  };
  liner: LinerType;
  loops: {
    type: LoopType;
  };
  printing: {
    type: PrintingType;
  };
  extras: Partial<Record<string, boolean>>;
  quantity: number;
}

export const DEFAULT_CONFIG: QuoteConfig = {
  construction: "circular",
  dimensions: { mode: "preset", presetId: "35x35x50" },
  swl: { lbs: 2000, safetyFactor: "5:1" },
  staticProtection: "typeA",
  fabricGsm: 150,
  coating: "none",
  top: { type: "open" },
  bottom: { type: "flat" },
  liner: "none",
  loops: { type: "crossCorner" },
  printing: { type: "none" },
  extras: {},
  quantity: 1000,
};

// ─── Price Result ──────────────────────────────────────────────────────────────

export interface PriceLineItem {
  label: string;
  amount: number;
  oneTime?: boolean;
}

export interface PriceResult {
  midPrice: number;
  lowPrice: number;
  highPrice: number;
  perBag: number;
  lineItems: PriceLineItem[];
  volumeMultiplier: number;
  volumeTierLabel: string;
  quantity: number;
}

// ─── Lead Data ─────────────────────────────────────────────────────────────────

export interface LeadData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  deliveryRegion: string;
  deliveryDate?: string;
  message?: string;
}

// ─── Compatibility Warning ─────────────────────────────────────────────────────

export interface CompatibilityWarning {
  id: string;
  message: string;
  severity: "warning" | "info";
}

// ─── Analytics ────────────────────────────────────────────────────────────────

export interface QuoteStepEvent {
  step_number: number;
  step_name: string;
  selection: string;
}

export interface QuoteSubmitEvent {
  quantity: number;
  construction: ConstructionType;
  static_type: StaticProtection;
  has_liner: boolean;
  has_printing: boolean;
}

import { useReducer, useMemo, useEffect, createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import type { QuoteConfig, PriceResult } from "@/types/quote";
import { DEFAULT_CONFIG } from "@/types/quote";
import { calculatePrice } from "@/lib/pricing";
import { parseUrlParams, mergeWithDefaults } from "@/lib/urlParams";
import { getCompatibilityWarnings } from "@/lib/compatibility";
import type { CompatibilityWarning } from "@/types/quote";

// ─── Actions ──────────────────────────────────────────────────────────────────

export type QuoteAction =
  | { type: "SET_CONSTRUCTION"; value: QuoteConfig["construction"] }
  | { type: "SET_DIMENSION_PRESET"; presetId: string }
  | { type: "SET_DIMENSION_CUSTOM"; custom: NonNullable<QuoteConfig["dimensions"]["custom"]> }
  | { type: "SET_SWL_LBS"; lbs: number }
  | { type: "SET_SWL_SF"; sf: QuoteConfig["swl"]["safetyFactor"] }
  | { type: "SET_STATIC"; value: QuoteConfig["staticProtection"] }
  | { type: "SET_FABRIC_GSM"; value: QuoteConfig["fabricGsm"] }
  | { type: "SET_COATING"; value: QuoteConfig["coating"] }
  | { type: "SET_TOP_TYPE"; value: QuoteConfig["top"]["type"] }
  | { type: "SET_TOP_SPOUT_DIAMETER"; value: NonNullable<QuoteConfig["top"]["spoutDiameter"]> }
  | { type: "SET_BOTTOM_TYPE"; value: QuoteConfig["bottom"]["type"] }
  | { type: "SET_BOTTOM_SPOUT_DIAMETER"; value: NonNullable<QuoteConfig["bottom"]["spoutDiameter"]> }
  | { type: "SET_LINER"; value: QuoteConfig["liner"] }
  | { type: "SET_LOOPS"; value: QuoteConfig["loops"]["type"] }
  | { type: "SET_PRINTING"; value: QuoteConfig["printing"]["type"] }
  | { type: "TOGGLE_EXTRA"; key: string }
  | { type: "SET_QUANTITY"; value: number }
  | { type: "RESET"; config: QuoteConfig };

function reducer(state: QuoteConfig, action: QuoteAction): QuoteConfig {
  switch (action.type) {
    case "SET_CONSTRUCTION":
      return { ...state, construction: action.value };
    case "SET_DIMENSION_PRESET":
      return { ...state, dimensions: { mode: "preset", presetId: action.presetId } };
    case "SET_DIMENSION_CUSTOM":
      return { ...state, dimensions: { mode: "custom", custom: action.custom } };
    case "SET_SWL_LBS":
      return { ...state, swl: { ...state.swl, lbs: action.lbs } };
    case "SET_SWL_SF":
      return { ...state, swl: { ...state.swl, safetyFactor: action.sf } };
    case "SET_STATIC":
      return { ...state, staticProtection: action.value };
    case "SET_FABRIC_GSM":
      return { ...state, fabricGsm: action.value };
    case "SET_COATING":
      return { ...state, coating: action.value };
    case "SET_TOP_TYPE":
      return { ...state, top: { type: action.value } };
    case "SET_TOP_SPOUT_DIAMETER":
      return { ...state, top: { ...state.top, spoutDiameter: action.value } };
    case "SET_BOTTOM_TYPE":
      return { ...state, bottom: { type: action.value } };
    case "SET_BOTTOM_SPOUT_DIAMETER":
      return { ...state, bottom: { ...state.bottom, spoutDiameter: action.value } };
    case "SET_LINER":
      return { ...state, liner: action.value };
    case "SET_LOOPS":
      return { ...state, loops: { type: action.value } };
    case "SET_PRINTING":
      return { ...state, printing: { type: action.value } };
    case "TOGGLE_EXTRA": {
      const cur = state.extras[action.key];
      return { ...state, extras: { ...state.extras, [action.key]: !cur } };
    }
    case "SET_QUANTITY":
      return { ...state, quantity: action.value };
    case "RESET":
      return action.config;
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

export interface QuoteContextValue {
  config: QuoteConfig;
  dispatch: React.Dispatch<QuoteAction>;
  priceResult: PriceResult;
  warnings: CompatibilityWarning[];
}

export const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuoteContext(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuoteContext must be used within QuoteContext.Provider");
  return ctx;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useQuoteConfig() {
  const [searchParams] = useSearchParams();

  const initialConfig = useMemo(() => {
    const partial = parseUrlParams(searchParams);
    return mergeWithDefaults(partial);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // parse once on mount

  const [config, dispatch] = useReducer(reducer, initialConfig);

  const priceResult = useMemo(() => calculatePrice(config), [config]);
  const warnings = useMemo(() => getCompatibilityWarnings(config), [config]);

  return { config, dispatch, priceResult, warnings };
}

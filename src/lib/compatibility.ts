import type { QuoteConfig, CompatibilityWarning } from "@/types/quote";

export function getCompatibilityWarnings(config: QuoteConfig): CompatibilityWarning[] {
  const warnings: CompatibilityWarning[] = [];

  // Type A + food grade → recommend Type C or D
  if (config.staticProtection === "typeA" && config.extras["foodGrade"]) {
    warnings.push({
      id: "typeA-foodGrade",
      message: "Food-grade applications often require Type C or D bags for static safety.",
      severity: "warning",
    });
  }

  // SWL > 3000 lbs + GSM < 170 → recommend 170+ GSM
  if (config.swl.lbs > 3000 && (typeof config.fabricGsm === "number" && config.fabricGsm < 170)) {
    warnings.push({
      id: "highSwl-lowGsm",
      message: "For loads over 3,000 lbs, we recommend 170+ GSM fabric for adequate strength.",
      severity: "warning",
    });
  }

  // Safety factor 6:1 + GSM ≤ 150 → recommend 170+ GSM
  if (config.swl.safetyFactor === "6:1" && (typeof config.fabricGsm === "number" && config.fabricGsm <= 150)) {
    warnings.push({
      id: "sf6-lowGsm",
      message: "Multi-trip (6:1 SF) bags typically require 170+ GSM fabric for durability.",
      severity: "warning",
    });
  }

  // Baffled + sleeve loop → not recommended
  if (config.construction === "baffled" && config.loops.type === "sleeve") {
    warnings.push({
      id: "baffled-sleeve",
      message: "Sleeve loops are not recommended for baffled bags — consider cross-corner or side-seam loops.",
      severity: "warning",
    });
  }

  // Type C + no ground tab → reminder
  if (config.staticProtection === "typeC" && !config.extras["groundTab"]) {
    warnings.push({
      id: "typeC-noGroundTab",
      message: "Type C bags require a conductive ground tab for safe use. Add it in the Extras step.",
      severity: "warning",
    });
  }

  return warnings;
}

import { useState } from "react";
import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";
import UnitToggle from "@/components/shared/UnitToggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRICING_CONFIG } from "@/data/pricingConfig";

const PRESETS = PRICING_CONFIG.dimensions.presets;

const Step02Dimensions = () => {
  const { config, dispatch } = useQuoteContext();
  const [customUnit, setCustomUnit] = useState<"in" | "cm">("in");
  const [customDims, setCustomDims] = useState({
    length: config.dimensions.custom?.length ?? 0,
    width: config.dimensions.custom?.width ?? 0,
    height: config.dimensions.custom?.height ?? 0,
  });

  const isCustom = config.dimensions.mode === "custom";

  function handleCustomChange(field: "length" | "width" | "height", val: string) {
    const num = parseFloat(val) || 0;
    const next = { ...customDims, [field]: num };
    setCustomDims(next);
    dispatch({ type: "SET_DIMENSION_CUSTOM", custom: { ...next, unit: customUnit } });
  }

  function handleUnitChange(unit: "in" | "cm") {
    setCustomUnit(unit);
    dispatch({ type: "SET_DIMENSION_CUSTOM", custom: { ...customDims, unit } });
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PRESETS.map((p) => (
          <OptionCard
            key={p.id}
            label={p.label}
            selected={!isCustom && config.dimensions.presetId === p.id}
            onClick={() => dispatch({ type: "SET_DIMENSION_PRESET", presetId: p.id })}
          />
        ))}
        <OptionCard
          label="Custom Size"
          sublabel="Enter your dimensions"
          selected={isCustom}
          onClick={() =>
            dispatch({ type: "SET_DIMENSION_CUSTOM", custom: { ...customDims, unit: customUnit } })
          }
        />
      </div>

      {isCustom && (
        <div className="border rounded-xl p-4 space-y-4 bg-muted/20">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Custom Dimensions</p>
            <UnitToggle unit={customUnit} onChange={handleUnitChange} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {(["length", "width", "height"] as const).map((field) => (
              <div key={field} className="space-y-1">
                <Label htmlFor={`dim-${field}`} className="text-xs capitalize">{field} ({customUnit})</Label>
                <Input
                  id={`dim-${field}`}
                  type="number"
                  min={0}
                  step={0.5}
                  value={customDims[field] || ""}
                  onChange={(e) => handleCustomChange(field, e.target.value)}
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step02Dimensions;

import { useQuoteContext } from "@/hooks/useQuoteConfig";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PRICING_CONFIG } from "@/data/pricingConfig";

const EXTRA_SUBLABELS: Record<string, string> = {
  docPouch: "External pocket for shipping documents",
  dustproofSeams: "Sealed seams to prevent fine particle leakage",
  uvStabilized: "Extended outdoor durability",
  foodGrade: "FDA-compliant materials & cleanroom manufactured",
  unCertified: "Certified for hazardous materials transport",
  groundTab: "Required for Type C conductive bags",
};

const Step12Extras = () => {
  const { config, dispatch } = useQuoteContext();
  const extras = Object.entries(PRICING_CONFIG.extras) as [
    keyof typeof PRICING_CONFIG.extras,
    { adder: number; label: string }
  ][];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {extras.map(([key, opt]) => {
        const checked = Boolean(config.extras[key]);
        return (
          <div
            key={key}
            className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-amber-500/50 cursor-pointer transition-colors"
            onClick={() => dispatch({ type: "TOGGLE_EXTRA", key })}
          >
            <Checkbox
              id={`extra-${key}`}
              checked={checked}
              onCheckedChange={() => dispatch({ type: "TOGGLE_EXTRA", key })}
              className="mt-0.5 border-amber-500 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
            />
            <div>
              <Label htmlFor={`extra-${key}`} className="cursor-pointer font-semibold text-sm">
                {opt.label}
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">{EXTRA_SUBLABELS[key]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Step12Extras;

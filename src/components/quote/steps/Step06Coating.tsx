import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";
import { PRICING_CONFIG } from "@/data/pricingConfig";

const COATING_SUBLABELS: Record<string, string> = {
  none: "Standard uncoated PP fabric",
  inside: "Moisture barrier on inner surface",
  outside: "UV & abrasion protection on outer surface",
  both: "Full moisture + UV protection",
};

const Step06Coating = () => {
  const { config, dispatch } = useQuoteContext();
  const options = Object.entries(PRICING_CONFIG.coating) as [
    keyof typeof PRICING_CONFIG.coating,
    { adder: number; label: string }
  ][];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map(([key, opt]) => (
        <OptionCard
          key={key}
          label={opt.label}
          sublabel={COATING_SUBLABELS[key]}
          selected={config.coating === key}
          onClick={() => dispatch({ type: "SET_COATING", value: key })}
        />
      ))}
    </div>
  );
};

export default Step06Coating;

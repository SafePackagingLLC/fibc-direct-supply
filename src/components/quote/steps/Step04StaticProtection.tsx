import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";
import { PRICING_CONFIG } from "@/data/pricingConfig";

const STATIC_DESCRIPTIONS: Record<string, string> = {
  typeA: "Non-conductive; safe for non-flammable products",
  typeB: "Low breakdown voltage; prevents spark discharge",
  typeC: "Conductive threads; requires grounding cable",
  typeD: "Static dissipative; no grounding required",
};

const Step04StaticProtection = () => {
  const { config, dispatch } = useQuoteContext();
  const options = Object.entries(PRICING_CONFIG.staticProtection) as [
    keyof typeof PRICING_CONFIG.staticProtection,
    { adder: number; label: string }
  ][];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map(([key, opt]) => (
        <OptionCard
          key={key}
          label={opt.label}
          sublabel={STATIC_DESCRIPTIONS[key]}
          selected={config.staticProtection === key}
          onClick={() => dispatch({ type: "SET_STATIC", value: key })}
        />
      ))}
    </div>
  );
};

export default Step04StaticProtection;

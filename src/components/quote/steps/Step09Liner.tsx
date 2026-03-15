import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";
import { PRICING_CONFIG } from "@/data/pricingConfig";

const LINER_SUBLABELS: Record<string, string> = {
  none: "No inner bag",
  pe: "Polyethylene — moisture barrier",
  foil: "Aluminium foil — aroma & moisture barrier",
  formFit: "Form-fit PE — pharma/food grade",
};

const Step09Liner = () => {
  const { config, dispatch } = useQuoteContext();
  const options = Object.entries(PRICING_CONFIG.liner) as [
    keyof typeof PRICING_CONFIG.liner,
    { adder: number; label: string }
  ][];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map(([key, opt]) => (
        <OptionCard
          key={key}
          label={opt.label}
          sublabel={LINER_SUBLABELS[key]}
          selected={config.liner === key}
          onClick={() => dispatch({ type: "SET_LINER", value: key })}
        />
      ))}
    </div>
  );
};

export default Step09Liner;

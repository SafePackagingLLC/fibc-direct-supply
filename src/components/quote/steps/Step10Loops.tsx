import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";
import { PRICING_CONFIG } from "@/data/pricingConfig";

const LOOP_IMAGES: Record<string, string> = {
  crossCorner: "/images/bag-parts/loop-cross-corner.png",
  sideSeam:    "/images/bag-parts/loop-corner-seam.png",
  twoLoop:     "/images/bag-parts/loop-stevedore.png",
  sleeve:      "/images/bag-parts/loop-sleeve.png",
};

const LOOP_SUBLABELS: Record<string, string> = {
  crossCorner: "Most common; easy forklift access",
  sideSeam:    "Reinforced seam loops",
  twoLoop:     "2 loops for stevedore/crane use",
  sleeve:      "Single sleeve for overhead lifting",
};

const Step10Loops = () => {
  const { config, dispatch } = useQuoteContext();
  const options = Object.entries(PRICING_CONFIG.loops) as [
    keyof typeof PRICING_CONFIG.loops,
    { adder: number; label: string }
  ][];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {options.map(([key, opt]) => (
        <OptionCard
          key={key}
          label={opt.label}
          sublabel={LOOP_SUBLABELS[key]}
          image={LOOP_IMAGES[key]}
          selected={config.loops.type === key}
          onClick={() => dispatch({ type: "SET_LOOPS", value: key })}
        />
      ))}
    </div>
  );
};

export default Step10Loops;

import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";
import { PRICING_CONFIG } from "@/data/pricingConfig";

const CONSTRUCTION_OPTIONS = [
  { id: "circular" as const, image: "/images/bag-parts/circular.png" },
  { id: "upanel" as const, image: "/images/bag-parts/u-panel.png" },
  { id: "4panel" as const, image: "/images/bag-parts/4-panel.png" },
  { id: "baffled" as const, image: "/images/bag-parts/baffled.png" },
];

const Step01Construction = () => {
  const { config, dispatch } = useQuoteContext();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {CONSTRUCTION_OPTIONS.map((opt) => {
        const cfg = PRICING_CONFIG.construction[opt.id];
        return (
          <OptionCard
            key={opt.id}
            label={cfg.label}
            selected={config.construction === opt.id}
            image={opt.image}
            onClick={() => dispatch({ type: "SET_CONSTRUCTION", value: opt.id })}
          />
        );
      })}
    </div>
  );
};

export default Step01Construction;

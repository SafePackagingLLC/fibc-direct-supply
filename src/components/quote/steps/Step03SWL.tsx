import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";
import { PRICING_CONFIG } from "@/data/pricingConfig";

// Deduplicate by lbs
const SWL_LBS = [...new Set(PRICING_CONFIG.swl.tiers.map((t) => t.lbs))];

const Step03SWL = () => {
  const { config, dispatch } = useQuoteContext();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold mb-3 text-muted-foreground">Safe Working Load</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {SWL_LBS.map((lbs) => {
            const tier = PRICING_CONFIG.swl.tiers.find((t) => t.lbs === lbs);
            return (
              <OptionCard
                key={lbs}
                label={`${lbs.toLocaleString()} lbs`}
                sublabel={tier ? `${tier.kg.toLocaleString()} kg` : undefined}
                selected={config.swl.lbs === lbs}
                onClick={() => dispatch({ type: "SET_SWL_LBS", lbs })}
              />
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold mb-3 text-muted-foreground">Safety Factor</p>
        <div className="grid grid-cols-2 gap-3 max-w-xs">
          {(["5:1", "6:1"] as const).map((sf) => (
            <OptionCard
              key={sf}
              label={`${sf} Safety Factor`}
              sublabel={sf === "5:1" ? "Single-trip" : "Multi-trip"}
              selected={config.swl.safetyFactor === sf}
              onClick={() => dispatch({ type: "SET_SWL_SF", sf })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step03SWL;

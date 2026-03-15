import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";
import { PRICING_CONFIG } from "@/data/pricingConfig";

const BOTTOM_IMAGES: Record<string, string> = {
  flat: "/images/bag-parts/plain-bottom.png",
  spout: "/images/bag-parts/spout-bottom.png",
  fullOpen: "/images/bag-parts/plain-bottom.png",
};

const BOTTOM_SUBLABELS: Record<string, string> = {
  flat: "Standard flat discharge",
  spout: "Controlled precise discharge",
  fullOpen: "Full opening for rapid discharge",
};

const SPOUT_DIAMETERS = ["12in", "14in", "16in", "18in"] as const;

const Step08Bottom = () => {
  const { config, dispatch } = useQuoteContext();
  const bottomOptions = (["flat", "spout", "fullOpen"] as const).map((key) => ({
    key,
    label: (PRICING_CONFIG.bottom[key] as { label: string }).label,
    image: BOTTOM_IMAGES[key],
    sublabel: BOTTOM_SUBLABELS[key],
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {bottomOptions.map((opt) => (
          <OptionCard
            key={opt.key}
            label={opt.label}
            sublabel={opt.sublabel}
            image={opt.image}
            selected={config.bottom.type === opt.key}
            onClick={() => dispatch({ type: "SET_BOTTOM_TYPE", value: opt.key })}
          />
        ))}
      </div>

      {config.bottom.type === "spout" && (
        <div>
          <p className="text-sm font-semibold mb-3 text-muted-foreground">Spout Diameter</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SPOUT_DIAMETERS.map((d) => (
              <OptionCard
                key={d}
                label={d.replace("in", '"')}
                selected={config.bottom.spoutDiameter === d}
                onClick={() => dispatch({ type: "SET_BOTTOM_SPOUT_DIAMETER", value: d })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step08Bottom;

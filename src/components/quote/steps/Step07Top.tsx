import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";
import { PRICING_CONFIG } from "@/data/pricingConfig";

const TOP_IMAGES: Record<string, string> = {
  open: "/images/bag-parts/open-top.png",
  duffle: "/images/bag-parts/duffle-top.png",
  spout: "/images/bag-parts/spout-top.png",
  closed: "/images/bag-parts/flap-top.png",
};

const TOP_SUBLABELS: Record<string, string> = {
  open: "Easy fill, standard",
  duffle: "Skirt closure for dust containment",
  spout: "Precise controlled filling",
  closed: "Fully sealed top",
};

const SPOUT_DIAMETERS = ["12in", "14in", "16in", "18in"] as const;

const Step07Top = () => {
  const { config, dispatch } = useQuoteContext();
  const topOptions = (["open", "duffle", "spout", "closed"] as const).map((key) => ({
    key,
    label: (PRICING_CONFIG.top[key] as { label: string }).label,
    image: TOP_IMAGES[key],
    sublabel: TOP_SUBLABELS[key],
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {topOptions.map((opt) => (
          <OptionCard
            key={opt.key}
            label={opt.label}
            sublabel={opt.sublabel}
            image={opt.image}
            selected={config.top.type === opt.key}
            onClick={() => dispatch({ type: "SET_TOP_TYPE", value: opt.key })}
          />
        ))}
      </div>

      {config.top.type === "spout" && (
        <div>
          <p className="text-sm font-semibold mb-3 text-muted-foreground">Spout Diameter</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SPOUT_DIAMETERS.map((d) => (
              <OptionCard
                key={d}
                label={d.replace("in", '"')}
                selected={config.top.spoutDiameter === d}
                onClick={() => dispatch({ type: "SET_TOP_SPOUT_DIAMETER", value: d })}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step07Top;

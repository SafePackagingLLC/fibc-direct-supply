import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PRICING_CONFIG } from "@/data/pricingConfig";
import { useState } from "react";

const QUICK_QUANTITIES = [100, 500, 1000, 2500, 5000, 10000];

const Step13Quantity = () => {
  const { config, dispatch } = useQuoteContext();
  const [custom, setCustom] = useState("");

  const tier = PRICING_CONFIG.volumeMultipliers.find(
    (t) => config.quantity >= t.min && (t.max === null || config.quantity <= t.max)
  );

  const discount =
    tier && tier.multiplier < 1
      ? `-${Math.round((1 - tier.multiplier) * 100)}%`
      : tier && tier.multiplier > 1
      ? `+${Math.round((tier.multiplier - 1) * 100)}% (small order)`
      : "Base price";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {QUICK_QUANTITIES.map((qty) => {
          const t = PRICING_CONFIG.volumeMultipliers.find(
            (v) => qty >= v.min && (v.max === null || qty <= v.max)
          );
          const pct = t
            ? t.multiplier < 1
              ? `-${Math.round((1 - t.multiplier) * 100)}%`
              : t.multiplier > 1
              ? `+${Math.round((t.multiplier - 1) * 100)}%`
              : "Base"
            : "";
          return (
            <OptionCard
              key={qty}
              label={qty.toLocaleString() + " units"}
              sublabel={pct}
              selected={config.quantity === qty}
              onClick={() => {
                setCustom("");
                dispatch({ type: "SET_QUANTITY", value: qty });
              }}
            />
          );
        })}
      </div>

      <div className="space-y-2 max-w-xs">
        <Label htmlFor="custom-qty" className="text-sm font-semibold">Or enter custom quantity</Label>
        <Input
          id="custom-qty"
          type="number"
          min={1}
          placeholder="e.g. 3500"
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            const n = parseInt(e.target.value, 10);
            if (!isNaN(n) && n > 0) dispatch({ type: "SET_QUANTITY", value: n });
          }}
        />
      </div>

      {tier && (
        <p className="text-sm text-muted-foreground">
          Volume tier: <span className="font-semibold text-foreground">{tier.label}</span>
          {" — "}
          <span className={tier.multiplier <= 1 ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>
            {discount}
          </span>
        </p>
      )}
    </div>
  );
};

export default Step13Quantity;

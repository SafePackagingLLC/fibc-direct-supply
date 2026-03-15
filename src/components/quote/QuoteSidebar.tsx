import { useQuoteContext } from "@/hooks/useQuoteConfig";
import { formatPrice, formatPriceRange } from "@/lib/pricing";
import { Separator } from "@/components/ui/separator";

const QuoteSidebar = () => {
  const { priceResult, config } = useQuoteContext();
  const { lineItems, lowPrice, highPrice, volumeTierLabel, volumeMultiplier, quantity } = priceResult;

  const perBagLineItems = lineItems.filter((li) => !li.oneTime);
  const oneTimeItems = lineItems.filter((li) => li.oneTime);

  return (
    <div className="sticky top-24 rounded-xl border bg-card shadow-sm p-5 space-y-4">
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">
          Estimated Price Range
        </p>
        <p className="text-2xl font-bold text-amber-500">
          {formatPriceRange(lowPrice, highPrice)}
        </p>
        <p className="text-xs text-muted-foreground">per bag · ±13% estimate</p>
      </div>

      <Separator />

      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
          Per-Bag Cost Breakdown
        </p>
        <div className="space-y-1.5">
          {perBagLineItems.map((li, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{li.label}</span>
              <span className="font-medium">{formatPrice(li.amount)}</span>
            </div>
          ))}
          {perBagLineItems.length === 0 && (
            <p className="text-xs text-muted-foreground">All adders at $0.00 — fill pricing config to see breakdown.</p>
          )}
        </div>
      </div>

      {oneTimeItems.length > 0 && (
        <>
          <Separator />
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              One-Time Charges
            </p>
            {oneTimeItems.map((li, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{li.label}</span>
                <span className="font-medium">{formatPrice(li.amount)}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <Separator />

      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Quantity</span>
          <span className="font-semibold">{quantity.toLocaleString()} units</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Volume tier</span>
          <span className="font-semibold text-green-600">
            {volumeTierLabel} ({volumeMultiplier < 1 ? "-" : volumeMultiplier > 1 ? "+" : ""}
            {volumeMultiplier !== 1 ? `${Math.round(Math.abs(1 - volumeMultiplier) * 100)}%` : "base"})
          </span>
        </div>
        <div className="flex justify-between text-sm font-bold border-t pt-2 mt-1">
          <span>Total (mid-estimate)</span>
          <span>{formatPrice(priceResult.midPrice * quantity)}</span>
        </div>
      </div>

      <p className="text-[10px] text-muted-foreground leading-relaxed">
        Price is an estimate based on current configuration. Final pricing confirmed upon order review.
      </p>
    </div>
  );
};

export default QuoteSidebar;

import { useState } from "react";
import { useQuoteContext } from "@/hooks/useQuoteConfig";
import { formatPriceRange, formatPrice } from "@/lib/pricing";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const QuoteMobileBar = () => {
  const { priceResult } = useQuoteContext();
  const [expanded, setExpanded] = useState(false);
  const { lowPrice, highPrice, midPrice, quantity, volumeTierLabel } = priceResult;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t shadow-xl">
      {expanded && (
        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Price Summary</p>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-semibold">{quantity.toLocaleString()} units</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Volume tier</span>
              <span className="font-semibold">{volumeTierLabel}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total (mid-estimate)</span>
              <span>{formatPrice(midPrice * quantity)}</span>
            </div>
          </div>
        </div>
      )}

      <button
        className="w-full px-4 py-3 flex items-center justify-between"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="text-left">
          <p className="text-xs text-muted-foreground">Estimated per bag</p>
          <p className="font-bold text-amber-500">{formatPriceRange(lowPrice, highPrice)}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>{expanded ? "Hide" : "Show"} details</span>
          {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </div>
      </button>
    </div>
  );
};

export default QuoteMobileBar;

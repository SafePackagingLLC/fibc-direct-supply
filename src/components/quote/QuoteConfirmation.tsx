import { CheckCircle2, Printer, Share2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteContext } from "@/hooks/useQuoteConfig";
import { formatPriceRange } from "@/lib/pricing";
import { PRICING_CONFIG } from "@/data/pricingConfig";

interface Props {
  onReset: () => void;
}

const QuoteConfirmation = ({ onReset }: Props) => {
  const { config, priceResult } = useQuoteContext();
  const { lowPrice, highPrice, quantity } = priceResult;

  const construction = PRICING_CONFIG.construction[config.construction as keyof typeof PRICING_CONFIG.construction];
  const liner = PRICING_CONFIG.liner[config.liner as keyof typeof PRICING_CONFIG.liner];
  const loops = PRICING_CONFIG.loops[config.loops.type as keyof typeof PRICING_CONFIG.loops];
  const dimLabel =
    config.dimensions.mode === "preset"
      ? PRICING_CONFIG.dimensions.presets.find((p) => p.id === config.dimensions.presetId)?.label ?? config.dimensions.presetId
      : "Custom Dimensions";

  const activeExtras = Object.entries(config.extras)
    .filter(([, v]) => v)
    .map(([k]) => PRICING_CONFIG.extras[k as keyof typeof PRICING_CONFIG.extras]?.label ?? k);

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: "My FIBC Quote", url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <div className="text-center space-y-6 py-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-1">Quote Request Sent!</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Check your inbox — your configuration and price range have been emailed to you. Our team will follow up within 1 business day.
        </p>
      </div>

      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 text-left max-w-lg mx-auto space-y-3">
        <p className="font-bold text-sm uppercase tracking-wide text-muted-foreground">Your Configuration</p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div><span className="text-muted-foreground">Construction:</span><p className="font-semibold">{construction?.label}</p></div>
          <div><span className="text-muted-foreground">Dimensions:</span><p className="font-semibold">{dimLabel}</p></div>
          <div><span className="text-muted-foreground">SWL:</span><p className="font-semibold">{config.swl.lbs.toLocaleString()} lbs ({config.swl.safetyFactor})</p></div>
          <div><span className="text-muted-foreground">Fabric:</span><p className="font-semibold">{config.fabricGsm === "220plus" ? "220+ GSM" : `${config.fabricGsm} GSM`}</p></div>
          <div><span className="text-muted-foreground">Liner:</span><p className="font-semibold">{liner?.label}</p></div>
          <div><span className="text-muted-foreground">Loops:</span><p className="font-semibold">{loops?.label}</p></div>
          <div><span className="text-muted-foreground">Quantity:</span><p className="font-semibold">{quantity.toLocaleString()} units</p></div>
          {activeExtras.length > 0 && (
            <div className="col-span-2"><span className="text-muted-foreground">Extras:</span><p className="font-semibold">{activeExtras.join(", ")}</p></div>
          )}
        </div>

        <div className="border-t pt-3 mt-3">
          <p className="text-muted-foreground text-xs mb-0.5">Estimated Price Range</p>
          <p className="text-2xl font-bold text-amber-500">{formatPriceRange(lowPrice, highPrice)}</p>
          <p className="text-xs text-muted-foreground">per bag · ±13% · at {quantity.toLocaleString()} units</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-2">
          <Printer className="h-4 w-4" />
          Print Summary
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
          <Share2 className="h-4 w-4" />
          Share Link
        </Button>
        <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Start Over
        </Button>
      </div>
    </div>
  );
};

export default QuoteConfirmation;

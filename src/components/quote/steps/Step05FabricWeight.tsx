import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";
import type { FabricGsm } from "@/types/quote";

const GSM_OPTIONS: Array<{ value: FabricGsm; label: string; sublabel: string }> = [
  { value: 140, label: "140 GSM", sublabel: "Light duty" },
  { value: 150, label: "150 GSM", sublabel: "Standard" },
  { value: 170, label: "170 GSM", sublabel: "Medium duty" },
  { value: 180, label: "180 GSM", sublabel: "Heavy duty" },
  { value: 200, label: "200 GSM", sublabel: "Extra heavy" },
  { value: "220plus", label: "220+ GSM", sublabel: "Ultra heavy" },
];

const Step05FabricWeight = () => {
  const { config, dispatch } = useQuoteContext();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {GSM_OPTIONS.map((opt) => (
        <OptionCard
          key={String(opt.value)}
          label={opt.label}
          sublabel={opt.sublabel}
          selected={config.fabricGsm === opt.value}
          onClick={() => dispatch({ type: "SET_FABRIC_GSM", value: opt.value })}
        />
      ))}
    </div>
  );
};

export default Step05FabricWeight;

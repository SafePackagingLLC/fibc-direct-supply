import { useQuoteContext } from "@/hooks/useQuoteConfig";
import OptionCard from "@/components/shared/OptionCard";

const PRINT_OPTIONS = [
  { value: "none" as const,   label: "No Printing",         sublabel: "Plain bag" },
  { value: "1c1s" as const,   label: "1 Color, 1 Side",     sublabel: "Basic logo/text" },
  { value: "1c2s" as const,   label: "1 Color, 2 Sides",    sublabel: "Both sides" },
  { value: "2c1s" as const,   label: "2 Colors, 1 Side",    sublabel: "More detail" },
  { value: "2c2s" as const,   label: "2 Colors, 2 Sides",   sublabel: "Both sides, 2 colors" },
  { value: "full" as const,   label: "Full Color",           sublabel: "Maximum branding" },
];

const Step11Printing = () => {
  const { config, dispatch } = useQuoteContext();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {PRINT_OPTIONS.map((opt) => (
        <OptionCard
          key={opt.value}
          label={opt.label}
          sublabel={opt.sublabel}
          selected={config.printing.type === opt.value}
          onClick={() => dispatch({ type: "SET_PRINTING", value: opt.value })}
        />
      ))}
    </div>
  );
};

export default Step11Printing;

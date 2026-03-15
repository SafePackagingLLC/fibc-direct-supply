import { cn } from "@/lib/utils";

interface UnitToggleProps {
  unit: "in" | "cm";
  onChange: (unit: "in" | "cm") => void;
}

const UnitToggle = ({ unit, onChange }: UnitToggleProps) => {
  return (
    <div className="inline-flex rounded-full border border-border p-0.5 gap-0.5">
      {(["in", "cm"] as const).map((u) => (
        <button
          key={u}
          type="button"
          onClick={() => onChange(u)}
          className={cn(
            "px-3 py-1 text-xs font-semibold rounded-full transition-all",
            unit === u
              ? "bg-amber-500 text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {u}
        </button>
      ))}
    </div>
  );
};

export default UnitToggle;

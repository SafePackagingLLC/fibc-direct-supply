import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  sublabel?: string;
  selected: boolean;
  onClick: () => void;
  image?: string;
  disabled?: boolean;
  className?: string;
}

const OptionCard = ({ label, sublabel, selected, onClick, image, disabled, className }: OptionCardProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-xl border-2 text-left transition-all",
        "hover:border-amber-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
        selected
          ? "border-amber-500 bg-amber-500/5 shadow-md"
          : "border-border bg-card",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {selected && (
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-500" />
      )}
      {image && (
        <div className="aspect-square bg-muted/30 rounded-lg mb-3 flex items-center justify-center p-3">
          <img src={image} alt={label} className="w-full h-full object-contain" />
        </div>
      )}
      <p className="text-sm font-semibold">{label}</p>
      {sublabel && <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>}
    </button>
  );
};

export default OptionCard;

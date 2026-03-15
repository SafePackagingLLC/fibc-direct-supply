import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import type { CompatibilityWarning } from "@/types/quote";

interface Props {
  warnings: CompatibilityWarning[];
}

const CompatibilityWarnings = ({ warnings }: Props) => {
  if (!warnings.length) return null;
  return (
    <div className="space-y-2">
      {warnings.map((w) => (
        <Alert key={w.id} className="border-amber-500/50 bg-amber-500/5">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-sm">{w.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

export default CompatibilityWarnings;

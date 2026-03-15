import { Progress } from "@/components/ui/progress";

interface QuoteProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuoteProgress = ({ currentStep, totalSteps }: QuoteProgressProps) => {
  const pct = Math.round((currentStep / totalSteps) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{pct}% complete</span>
      </div>
      <Progress value={pct} className="h-1.5 [&>div]:bg-amber-500" />
    </div>
  );
};

export default QuoteProgress;

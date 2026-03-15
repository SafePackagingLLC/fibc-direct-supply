import { useEffect, useRef } from "react";
import { trackStepComplete, trackQuoteSubmitted, trackQuoteAbandoned } from "@/lib/analytics";
import type { QuoteConfig } from "@/types/quote";

export function useQuoteAnalytics(config: QuoteConfig, completedStep: number) {
  const lastStepRef = useRef(completedStep);
  lastStepRef.current = completedStep;

  // Track abandon on unmount
  useEffect(() => {
    return () => {
      if (lastStepRef.current > 0) {
        trackQuoteAbandoned(lastStepRef.current);
      }
    };
  }, []);

  function trackStep(stepNumber: number, stepName: string, selection: string) {
    trackStepComplete({ step_number: stepNumber, step_name: stepName, selection });
  }

  function trackSubmit() {
    trackQuoteSubmitted({
      quantity: config.quantity,
      construction: config.construction,
      static_type: config.staticProtection,
      has_liner: config.liner !== "none",
      has_printing: config.printing.type !== "none",
    });
  }

  return { trackStep, trackSubmit };
}

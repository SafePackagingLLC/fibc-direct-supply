import type { QuoteStepEvent, QuoteSubmitEvent } from "@/types/quote";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function push(data: Record<string, unknown>): void {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(data);
  }
}

export function trackStepComplete(event: QuoteStepEvent): void {
  push({ event: "quote_step_complete", ...event });
}

export function trackQuoteSubmitted(event: QuoteSubmitEvent): void {
  push({ event: "quote_submitted", ...event });
}

export function trackQuoteAbandoned(lastCompletedStep: number): void {
  push({ event: "quote_abandoned", last_completed_step: lastCompletedStep });
}

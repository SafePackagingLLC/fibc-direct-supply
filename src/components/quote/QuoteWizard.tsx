import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";
import QuoteProgress from "./QuoteProgress";
import CompatibilityWarnings from "@/components/shared/CompatibilityWarning";
import { useQuoteContext } from "@/hooks/useQuoteConfig";

import Step01Construction from "./steps/Step01Construction";
import Step02Dimensions from "./steps/Step02Dimensions";
import Step03SWL from "./steps/Step03SWL";
import Step04StaticProtection from "./steps/Step04StaticProtection";
import Step05FabricWeight from "./steps/Step05FabricWeight";
import Step06Coating from "./steps/Step06Coating";
import Step07Top from "./steps/Step07Top";
import Step08Bottom from "./steps/Step08Bottom";
import Step09Liner from "./steps/Step09Liner";
import Step10Loops from "./steps/Step10Loops";
import Step11Printing from "./steps/Step11Printing";
import Step12Extras from "./steps/Step12Extras";
import Step13Quantity from "./steps/Step13Quantity";

const STEPS = [
  { id: "step-01", number: 1,  label: "Construction Type",    component: <Step01Construction /> },
  { id: "step-02", number: 2,  label: "Dimensions",           component: <Step02Dimensions /> },
  { id: "step-03", number: 3,  label: "Safe Working Load",    component: <Step03SWL /> },
  { id: "step-04", number: 4,  label: "Static Protection",    component: <Step04StaticProtection /> },
  { id: "step-05", number: 5,  label: "Fabric Weight (GSM)",  component: <Step05FabricWeight /> },
  { id: "step-06", number: 6,  label: "PP Coating",           component: <Step06Coating /> },
  { id: "step-07", number: 7,  label: "Bag Top",              component: <Step07Top /> },
  { id: "step-08", number: 8,  label: "Bag Bottom",           component: <Step08Bottom /> },
  { id: "step-09", number: 9,  label: "Liner",                component: <Step09Liner /> },
  { id: "step-10", number: 10, label: "Lifting Loops",        component: <Step10Loops /> },
  { id: "step-11", number: 11, label: "Printing",             component: <Step11Printing /> },
  { id: "step-12", number: 12, label: "Extras & Certifications", component: <Step12Extras /> },
  { id: "step-13", number: 13, label: "Quantity",             component: <Step13Quantity /> },
];

interface QuoteWizardProps {
  onComplete: () => void;
}

const QuoteWizard = ({ onComplete }: QuoteWizardProps) => {
  const { warnings } = useQuoteContext();
  const [openItem, setOpenItem] = useState("step-01");
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const currentStepNumber =
    STEPS.find((s) => s.id === openItem)?.number ?? 1;

  function handleNext(stepId: string) {
    setCompletedSteps((prev) => new Set([...prev, stepId]));
    const idx = STEPS.findIndex((s) => s.id === stepId);
    if (idx < STEPS.length - 1) {
      setOpenItem(STEPS[idx + 1].id);
    } else {
      // All steps done — trigger lead form
      onComplete();
    }
  }

  return (
    <div className="space-y-4">
      <QuoteProgress currentStep={currentStepNumber} totalSteps={STEPS.length} />

      {warnings.length > 0 && <CompatibilityWarnings warnings={warnings} />}

      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={(v) => { if (v) setOpenItem(v); }}
        className="space-y-2"
      >
        {STEPS.map((step) => {
          const done = completedSteps.has(step.id);
          return (
            <AccordionItem
              key={step.id}
              value={step.id}
              className="border rounded-xl px-4 overflow-hidden"
            >
              <AccordionTrigger className="py-4 hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold shrink-0 ${
                    done
                      ? "bg-amber-500 text-white"
                      : openItem === step.id
                      ? "bg-amber-500/20 text-amber-600 border border-amber-500"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {done ? <CheckCircle2 className="h-4 w-4" /> : step.number}
                  </div>
                  <span className="font-semibold text-sm">{step.label}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-4">
                  {step.component}
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => handleNext(step.id)}
                      className="px-5 py-2 text-sm font-semibold rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                    >
                      {step.number === STEPS.length ? "Get My Price →" : "Next →"}
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default QuoteWizard;

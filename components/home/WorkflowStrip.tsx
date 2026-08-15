import type { WorkflowStep } from "@/lib/data/home-sections";

interface WorkflowStripProps {
  steps: WorkflowStep[];
}

/** Numbered horizontal (wrapping on smaller screens) process strip — used for both the 7-step Engineering Workflow and the 8-step Quality Process. */
export default function WorkflowStrip({ steps }: WorkflowStripProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {steps.map(({ step, title }) => (
        <div key={step} className="glass flex flex-col gap-2 rounded-lg p-5">
          <span className="font-mono text-xs text-gold-500">{String(step).padStart(2, "0")}</span>
          <span className="font-display text-sm text-white">{title}</span>
        </div>
      ))}
    </div>
  );
}

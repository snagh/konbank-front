interface StepperProps {
  currentStep: number;
  totalSteps: number;
  title: string;
}

export function Stepper({ currentStep, totalSteps, title }: StepperProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex items-baseline gap-1.5 mb-2">
        <span className="text-sm font-medium text-slate-500">
          Passo {currentStep} de {totalSteps}
        </span>
        <span className="text-sm font-semibold text-slate-400">de</span>
        <h2 className="text-xl font-bold text-blue-900 tracking-tight">
          {title}
        </h2>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(37,99,235,0.4)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

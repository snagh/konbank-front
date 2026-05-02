import { useState } from "react";
import { Stepper } from "./components/Stepper";
import { Step1 } from "./components/steps/Step1";
import type { Step1Data } from "./components/steps/Step1";
import { Step2 } from "./components/steps/Step2";
import { Step3 } from "./components/steps/Step3";
import type { Step3Data } from "./components/steps/Step3";
import { Step4 } from "./components/steps/Step4";

export default function App() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState<Partial<Step1Data & Step3Data>>({});

  const handleNextStep1 = (data: Step1Data) => {
    console.log("Step 1 Data:", data);
    setFormData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleNextStep2 = () => {
    console.log("Step 2 completed");
    setStep(3);
  };

  const handleNextStep3 = (data: Step3Data) => {
    console.log("Step 3 Data:", data);
    setFormData(prev => ({ ...prev, ...data }));
    setStep(4);
  };

  const handleNextStep4 = () => {
    console.log("Step 4 completed. Final form data:", formData);
    setStep(5);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleEditStep = (stepNumber: number) => {
    setStep(stepNumber);
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Dados Básicos";
      case 2: return "Envio De Documentos";
      case 3: return "Endereço";
      case 4: return "Revisar Dados";
      case 5: return "Cadastro Aprovado!";
      default: return "";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]" />
      </div>

      <section className="bg-white/80 glass w-full max-w-[640px] p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
        <Stepper 
          currentStep={step} 
          totalSteps={totalSteps} 
          title={getStepTitle()} 
        />

        {step === 1 && <Step1 onNext={handleNextStep1} />}
        {step === 2 && <Step2 onNext={handleNextStep2} onBack={handleBack} />}
        {step === 3 && <Step3 onNext={handleNextStep3} onBack={handleBack} />}
        {step === 4 && <Step4 formData={formData} onNext={handleNextStep4} onBack={handleBack} onEditStep={handleEditStep} />}
        {step > 4 && (
          <div className="text-center py-10 text-slate-500">
            Passo {step} em desenvolvimento...
            <div className="mt-4">
              <button onClick={handleBack} className="px-4 py-2 border rounded-md">Voltar</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}


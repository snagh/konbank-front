import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "./components/Input";
import { Stepper } from "./components/Stepper";
import { formatCPF, formatDate, formatTelefone } from "./utils/formatters";

// Validation Schema for Step 1
const step1Schema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 letras"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido (use o formato 000.000.000-00)"),
  dataNascimento: z.string().min(10, "Data de nascimento inválida"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(14, "Telefone inválido (use o formato (00) 00000-0000)"),
});

type Step1Data = z.infer<typeof step1Schema>;

export default function App() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const { register, handleSubmit, formState: { errors } } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema)
  });

  const onSubmit = (_data: Step1Data) => {
    // Advanced to next step; data is processed. Console log removed.
    setStep(2);
  };

  const getStepTitle = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return "Dados Básicos";
      case 2:
        return "Endereço";
      case 3:
        return "Dados Profissionais";
      case 4:
        return "Documentos";
      case 5:
        return "Revisão e Envio";
      default:
        return "Cadastro";
    }
  };

  // Extract register properties to intercept onChange
  const nomeRegister = register("nome");
  const cpfRegister = register("cpf");
  const dataNascimentoRegister = register("dataNascimento");
  const emailRegister = register("email");
  const telefoneRegister = register("telefone");

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[120px]" />
      </div>

      <section className="bg-white/80 glass w-full max-w-lg p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
        <Stepper 
          currentStep={step} 
          totalSteps={totalSteps} 
          title={getStepTitle(step)} 
        />

        {step === 1 ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
            <Input
              label="Nome Completo"
              placeholder="Digite seu nome completo"
              registration={nomeRegister}
              error={errors.nome?.message}
            />

            <Input
              label="CPF"
              placeholder="000.000.000-00"
              registration={{
                ...cpfRegister,
                onChange: (e) => {
                  e.target.value = formatCPF(e.target.value);
                  return cpfRegister.onChange(e);
                }
              }}
              error={errors.cpf?.message}
            />

            <Input
              label="Data de Nascimento"
              type="text"
              placeholder="DD/MM/AAAA"
              registration={{
                ...dataNascimentoRegister,
                onChange: (e) => {
                  e.target.value = formatDate(e.target.value);
                  return dataNascimentoRegister.onChange(e);
                }
              }}
              error={errors.dataNascimento?.message}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
                </svg>
              }
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              registration={emailRegister}
              error={errors.email?.message}
            />

            <Input
              label="Telefone"
              placeholder="(00) 00000-0000"
              registration={{
                ...telefoneRegister,
                onChange: (e) => {
                  e.target.value = formatTelefone(e.target.value);
                  return telefoneRegister.onChange(e);
                }
              }}
              error={errors.telefone?.message}
            />

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                disabled
                className="flex-1 px-6 py-3 border border-slate-200 text-slate-400 font-semibold rounded-xl bg-slate-50 opacity-65 cursor-not-allowed transition-all"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] transition-all"
              >
                Continuar
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 text-center py-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900 tracking-tight">
                {getStepTitle(step)}
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Esta etapa está sendo desenvolvida. Seus dados da Etapa 1 foram salvos com sucesso!
              </p>
            </div>
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
                className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => setStep((prev) => Math.min(prev + 1, totalSteps))}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] transition-all"
              >
                {step === totalSteps ? "Finalizar" : "Continuar"}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

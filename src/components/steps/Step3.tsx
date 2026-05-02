import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../Input";
import { useState } from "react";

const step3Schema = z.object({
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido (ex: 12345-678)"),
  rua: z.string().min(3, "Rua deve ter pelo menos 3 caracteres"),
  numero: z.string().min(1, "Número é obrigatório"),
  bairro: z.string().min(2, "Bairro é obrigatório"),
  estado: z.string().min(2, "Estado é obrigatório"),
});

export type Step3Data = z.infer<typeof step3Schema>;

interface Step3Props {
  onNext: (data: Step3Data) => void;
  onBack: () => void;
}

export function Step3({ onNext, onBack }: Step3Props) {
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema)
  });

  const cepValue = watch("cep");

  const handleBuscarCep = async () => {
    // Valida apenas o campo CEP antes de buscar
    const isCepValid = await trigger("cep");
    if (!isCepValid) return;

    setIsSearchingCep(true);
    
    // Simulação de busca na API (ViaCEP)
    setTimeout(() => {
      // Mock de resposta
      setValue("rua", "Rua das Flores", { shouldValidate: true });
      setValue("bairro", "Centro", { shouldValidate: true });
      setValue("estado", "São Paulo - SP", { shouldValidate: true });
      setIsSearchingCep(false);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-1">
      <Input
        label="CEP"
        placeholder="12345-678"
        registration={register("cep")}
        error={errors.cep?.message}
        rightElement={
          <button
            type="button"
            onClick={handleBuscarCep}
            disabled={isSearchingCep || !cepValue}
            className="h-full px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearchingCep ? (
              <svg className="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Buscar"
            )}
          </button>
        }
      />

      <Input
        label="Rua"
        placeholder="Rua Sol Poente"
        registration={register("rua")}
        error={errors.rua?.message}
      />

      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <Input
          label="Número"
          placeholder="13-A"
          registration={register("numero")}
          error={errors.numero?.message}
        />
        <Input
          label="Bairro"
          placeholder="Rio Verde"
          registration={register("bairro")}
          error={errors.bairro?.message}
        />
      </div>

      <Input
        label="Estado"
        placeholder="Cidade - UF"
        registration={register("estado")}
        error={errors.estado?.message}
      />

      <div className="flex gap-4 pt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all"
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
  );
}

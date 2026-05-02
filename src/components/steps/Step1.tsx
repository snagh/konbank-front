import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../Input";

// Validation Schema for Step 1
const step1Schema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 letras"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, "CPF inválido"),
  dataNascimento: z.string().min(10, "Data de nascimento inválida"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
});

export type Step1Data = z.infer<typeof step1Schema>;

interface Step1Props {
  onNext: (data: Step1Data) => void;
}

export function Step1({ onNext }: Step1Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema)
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-1">
      <Input
        label="Nome Completo"
        placeholder="Digite seu nome completo"
        registration={register("nome")}
        error={errors.nome?.message}
      />

      <Input
        label="CPF"
        placeholder="000.000.000-00"
        registration={register("cpf")}
        error={errors.cpf?.message}
      />

      <Input
        label="Data de Nascimento"
        type="text"
        placeholder="DD/MM/AAAA"
        registration={register("dataNascimento")}
        error={errors.dataNascimento?.message}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          let value = e.target.value.replace(/\D/g, '');
          if (value.length > 8) value = value.slice(0, 8);
          if (value.length >= 5) {
            value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
          } else if (value.length >= 3) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
          }
          e.target.value = value;
        }}
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
        registration={register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Telefone"
        placeholder="(00) 00000-0000"
        registration={register("telefone")}
        error={errors.telefone?.message}
      />

      <div className="flex gap-4 pt-6">
        <button
          type="button"
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

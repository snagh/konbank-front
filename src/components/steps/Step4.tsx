import { ReviewCard } from "../ReviewCard";

interface Step4Props {
  formData: any; // Using any for simplicity here to accept all collected data
  onNext: () => void;
  onBack: () => void;
  onEditStep: (stepNumber: number) => void;
}

export function Step4({ formData, onNext, onBack, onEditStep }: Step4Props) {
  return (
    <div className="space-y-2">
      <ReviewCard 
        title="Dados Pessoais" 
        onEdit={() => onEditStep(1)}
      >
        <span>{formData.nome || "João Silva"}</span>
        <span className="text-sm text-slate-500">{formData.cpf || "123.456.789-00"}</span>
      </ReviewCard>

      <ReviewCard 
        title="Endereço" 
        onEdit={() => onEditStep(3)}
      >
        <span>
          {formData.rua || "Rua das Flores"}, {formData.numero || "123"}
        </span>
        <span className="text-sm text-slate-500">
          {formData.bairro ? `${formData.bairro}, ` : ""}
          {formData.estado || "São Paulo - SP"}
        </span>
      </ReviewCard>

      <ReviewCard 
        title="Renda Mensal" 
        onEdit={() => console.log("Ainda não temos essa etapa de edição!")}
      >
        <span>R$ 5.000,00</span>
        <span className="text-sm text-slate-500">CLT</span>
      </ReviewCard>

      <div className="flex gap-4 pt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 active:scale-[0.98] transition-all"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}

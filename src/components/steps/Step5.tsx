interface Step5Props {
  formData: any;
  onFinish: () => void;
}

export function Step5({ formData, onFinish }: Step5Props) {
  // Pega o primeiro nome (ou João se estiver vazio)
  const primeiroNome = formData.nome ? formData.nome.split(" ")[0] : "João";

  return (
    <div className="flex flex-col items-center justify-center text-center py-6 px-4 animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Cadastro Aprovado!
      </h2>

      <p className="text-lg font-medium text-slate-700 mb-2">
        Parabéns, {primeiroNome}!
      </p>
      
      <p className="text-slate-500 text-sm mb-8">
        Seu cadastro foi aprovado com sucesso!
      </p>

      <div className="w-full h-px bg-slate-200 mb-6" />

      <p className="text-base font-medium text-slate-700 mb-8">
        Limite de Crédito: <span className="text-green-600 font-bold">R$ 15.000,00</span>
      </p>

      <button
        type="button"
        onClick={onFinish}
        className="w-full sm:w-64 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 active:scale-95 transition-all"
      >
        Concluir
      </button>
    </div>
  );
}

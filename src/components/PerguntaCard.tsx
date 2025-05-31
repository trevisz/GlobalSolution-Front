"use client";

type PerguntaProps = {
  enunciado: string;
  alternativas: string[];
  correta: string;
};

export default function PerguntaCard({ enunciado, alternativas, correta }: PerguntaProps) {
  const handleClick = (resposta: string) => {
    alert(resposta === correta ? 'Correto!' : 'Errado!');
    // Aqui vamos integrar a lógica visual (verde/vermelho)
  };

  return (
    <div className="border p-4 mb-4 rounded">
      <p className="font-semibold">{enunciado}</p>
      <div className="flex flex-col mt-2 gap-2">
        {alternativas.map((alt, idx) => (
          <button key={idx} onClick={() => handleClick(alt)} className="border p-2 rounded hover:bg-gray-200">
            {alt}
          </button>
        ))}
      </div>
    </div>
  );
}

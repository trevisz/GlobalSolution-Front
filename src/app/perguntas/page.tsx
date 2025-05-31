"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";

type Pergunta = {
  id_pergunta: number;
  enunciado: string;
  alternativaA: string;
  alternativaB: string;
  alternativaC: string;
  alternativaD: string;
  correta: string;
};

export default function PerguntasPage() {
  const { user } = useUser();
  const router = useRouter();
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [respostas, setRespostas] = useState<Record<number, string>>({});
  const [categoria, setCategoria] = useState<string | null>(null);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [carregando, setCarregando] = useState(false);
  const [categoriasFinalizadas, setCategoriasFinalizadas] = useState<string[]>([]);

  const categorias = ["Meio Ambiente", "Sustentabilidade"];

  useEffect(() => {
    if (!user) {
      setCarregando(true);
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  }, [user]);

  const buscarPerguntas = async (categoria: string) => {
    setCategoria(categoria);
    const res = await fetch(`https://quarkus-app.onrender.com/perguntas/categoria/${encodeURIComponent(categoria)}`);
    const data = await res.json();
    setPerguntas(data);
    setRespostas({});
    setPerguntaAtual(0);
  };

  const handleResposta = (id: number, resposta: string) => {
    if (respostas[id]) return;
    setRespostas({ ...respostas, [id]: resposta });

    setTimeout(() => {
      if (perguntaAtual < perguntas.length - 1) {
        setPerguntaAtual(perguntaAtual + 1);
      } else {
        finalizarQuiz();
      }
    }, 1000);
  };

  const finalizarQuiz = async () => {
    const acertos = Object.entries(respostas).filter(([id, resposta]) => {
      const pergunta = perguntas.find((p) => p.id_pergunta === Number(id));
      return pergunta?.correta === resposta;
    }).length;

    const payload = {
      usuario_id: user?.id_usuario,
      pontuacao: acertos,
      dataJogo: new Date().toISOString()
    };

    try {
      const res = await fetch("https://quarkus-app.onrender.com/resultados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert(`Quiz finalizado! Você acertou ${acertos} de ${perguntas.length} perguntas.`);
      } else {
        alert("Erro ao salvar pontuação.");
      }
    } catch (error) {
      console.error("Erro ao enviar pontuação:", error);
    }

    setCategoriasFinalizadas([...categoriasFinalizadas, categoria!]);
    setCategoria(null);
    setPerguntas([]);
    setRespostas({});
    setPerguntaAtual(0);
  };

  return (
    <>
      <Header />
      <main className="p-4 flex flex-col min-h-screen bg-[#0a192f]">
        {carregando ? (
          <p className="text-red-500 text-center mt-20 text-xl">
            Você precisa estar logado para acessar as perguntas. Redirecionando...
          </p>
        ) : (
          <>
            {!categoria && (
              <>
                <h1 className="text-2xl font-bold mb-4 text-center">Escolha uma categoria</h1>
                <div className="flex gap-4 justify-center flex-wrap">
                  {categorias.map((cat) => {
                    const finalizada = categoriasFinalizadas.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => buscarPerguntas(cat)}
                        disabled={finalizada}
                        className={`p-2 rounded ${finalizada ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                      >
                        {cat} {finalizada ? "✔️" : ""}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {categoria && perguntas.length > 0 && (
              <>
                <div className="flex flex-col items-center mb-4 relative">
                  <button
                    onClick={() => { setCategoria(null); setPerguntas([]); }}
                    className="absolute left-0 bg-gray-300 text-black p-2 rounded"
                  >
                    Voltar às Categorias
                  </button>
                  <h1 className="text-2xl font-bold text-center">{`Categoria: ${categoria}`}</h1>
                </div>

                <div key={perguntas[perguntaAtual].id_pergunta} className="border p-4 mb-4 rounded bg-gray-50">
                  <p className="font-semibold text-lg text-black">{perguntas[perguntaAtual].enunciado}</p>
                  <div className="flex flex-col mt-2 gap-2">
                    {["A", "B", "C", "D"].map((letra) => {
                      const p = perguntas[perguntaAtual];
                      const alt = p[`alternativa${letra}` as keyof Pergunta];
                      const correta = p.correta;
                      const escolhida = respostas[p.id_pergunta];
                      let cor = "bg-gray-100";

                      if (escolhida) {
                        if (letra === correta) cor = "bg-green-300";
                        else if (letra === escolhida) cor = "bg-red-300";
                        else cor = "opacity-50";
                      }

                      return (
                        <button
                          key={letra}
                          onClick={() => handleResposta(p.id_pergunta, letra)}
                          disabled={!!escolhida}
                          className={`p-2 rounded ${cor} border text-black`}
                        >
                          {alt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

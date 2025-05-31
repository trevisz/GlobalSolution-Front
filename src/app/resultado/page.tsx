"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function ResultadoPage() {
  const { user } = useUser();
  const [totalPontos, setTotalPontos] = useState<number | null>(null);
  const [nivel, setNivel] = useState<string | null>(null);
  const [imagem, setImagem] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/resultados/${user.id_usuario}/total`)
        .then(res => res.json())
        .then(data => {
          setTotalPontos(data.total_pontos);
          calcularNivel(data.total_pontos);
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  const calcularNivel = (pontos: number) => {
    if (pontos >= 8) {
      setNivel("Diamante");
      setImagem("/images/Diamond.png");
    } else if (pontos >= 5) {
      setNivel("Ouro");
      setImagem("/images/Gold.png");
    } else if (pontos >= 1) {
      setNivel("Prata");
      setImagem("/images/Silver.png");
    } else {
      setNivel("Sem Ranking");
      setImagem(null);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a192f] text-white">
        <div className="bg-[#0d253f] p-6 rounded-2xl shadow-lg max-w-md text-center">
          <h1 className="text-3xl font-bold mb-4 text-[#66ccff]">Ranking</h1>
          {user ? (
            <>
              <p className="text-lg mb-4">
                Olá <span className="text-[#66ccff] font-semibold">{user.nome}</span>, seu nível de classificação atual é:
              </p>

              {imagem ? (
                <>
                  <div className="relative w-32 h-32 mx-auto mb-2">
                    <Image src={imagem} alt={nivel!} fill className="rounded-full object-contain" />
                  </div>
                  <p className="text-xl font-bold text-[#66ccff]">{nivel}</p>
                </>
              ) : (
                <p className="text-gray-400 mb-4">Nenhum nível ainda</p>
              )}

              <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto mt-4 mb-2">
                <div
                  className="h-2 bg-[#66ccff]"
                  style={{ width: `${(totalPontos ?? 0) * 10}%` }}
                ></div>
              </div>
              <p className="text-white text-sm">{totalPontos ?? 0} ponto{(totalPontos ?? 0) !== 1 ? "s" : ""}</p>
            </>
          ) : (
            <p className="text-red-500">Você precisa estar logado para ver seu ranking.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

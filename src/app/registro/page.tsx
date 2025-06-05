"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

export default function RegistroPage() {
  const { setUser } = useUser();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleRegistro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensagem(null);

    if (!nome.trim() || !email.trim()) {
      setMensagem("⚠️ Preencha nome e email.");
      return;
    }

    setCarregando(true);
    try {
      const response = await fetch("https://quarkus-app.onrender.com/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setMensagem(`✅ Cadastro realizado com sucesso, ${data.nome}!`);
        setTimeout(() => router.push("/perguntas"), 1000);
      } else {
        setMensagem("❌ Erro ao registrar. Tente novamente.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMensagem(`Erro: ${err.message}`);
      } else {
        setMensagem("Erro inesperado ao registrar.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a192f] text-white p-4">
        <h1 className="text-3xl font-bold mb-4 text-[#66ccff]">Cadastro no GSQuiz</h1>

        <form onSubmit={handleRegistro} className="flex flex-col gap-2 bg-[#0d253f] p-6 rounded-xl shadow-lg w-80">
          <input
            type="text"
            placeholder="Nome"
            className="p-2 rounded bg-[#0a192f] text-white"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded bg-[#0a192f] text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={carregando}
            className={`p-2 rounded ${carregando ? "bg-gray-500 text-white" : "bg-[#66ccff] text-black"}`}
          >
            {carregando ? "Registrando..." : "Registrar"}
          </button>
        </form>

        {mensagem && (
          <p className="mt-4 text-sm text-yellow-300 text-center">{mensagem}</p>
        )}

        <p className="mt-4">
          Já tem conta? <Link href="/" className="text-[#66ccff] underline">Faça login</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}

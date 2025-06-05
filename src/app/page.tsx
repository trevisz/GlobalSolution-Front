"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import React from "react";
import Link from "next/link";

export default function Home() {
  const { user, setUser } = useUser();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensagem(null);

    if (!nome.trim() || !email.trim()) {
      setMensagem("⚠️ Preencha nome e email.");
      return;
    }

    setCarregando(true);
    try {
      const response = await fetch(`https://quarkus-app.onrender.com/usuarios/buscar?email=${email}`);
      if (response.ok) {
        const data = await response.json();
        if (data.nome.toLowerCase() !== nome.toLowerCase()) {
          setMensagem("❌ Nome ou email incorreto. Tente novamente.");
        } else {
          setUser(data);
          setMensagem(`✅ Bem-vindo de volta, ${data.nome}!`);
          setTimeout(() => router.push("/perguntas"), 1000);
        }
      } else {
        setMensagem("❌ Usuário não encontrado. Cadastre-se primeiro.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMensagem(`Erro na requisição: ${err.message}`);
      } else {
        setMensagem("Erro inesperado ao tentar login.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a192f] p-4 text-white">
        {user ? (
          <p className="text-green-500 text-xl font-bold mt-20">
            Você já está logado como {user.nome}!
          </p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4 text-[#66ccff]">Login no GSQuiz</h1>

            <form onSubmit={handleLogin} className="flex flex-col gap-3 w-80">
              <input
                type="text"
                placeholder="Ex: João Victor"
                className="border p-2 rounded"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="email"
                placeholder="Ex: joaovi@gmail.com"
                className="border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={carregando}
                className={`p-2 rounded text-white ${carregando ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"}`}
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>
            </form>

            {mensagem && (
              <p className="mt-3 text-sm text-center text-yellow-300">{mensagem}</p>
            )}

            <p className="mt-4">
              Não tem conta?{" "}
              <Link href="/registro" className="text-blue-400 underline">
                Cadastre-se aqui
              </Link>
            </p>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

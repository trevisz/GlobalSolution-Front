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
  const router = useRouter();

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!nome || !email) {
    alert("Preencha nome e email");
    return;
  }

  try {
    const response = await fetch(`https://quarkus-app.onrender.com/usuarios/buscar?email=${email}`);
    if (response.ok) {
      const data = await response.json();
      if (data.nome.toLowerCase() !== nome.toLowerCase()) {
        alert("Nome ou email incorreto. Tente novamente.");
        return;
      }
      setUser(data);
      alert(`Bem-vindo de volta, ${data.nome}!`);
      router.push("/perguntas");
    } else {
      alert("Usuário não encontrado. Cadastre-se primeiro.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro na requisição");
  }
};


  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a192f] p-4">
        {user ? (
          <p className="text-green-600 text-xl font-bold mt-20">Você já está logado como {user.nome}!</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">Login no GSQuiz</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-2 w-80">
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
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">Entrar</button>
            </form>
            <p className="mt-4">
              Não tem conta? <Link href="/registro" className="text-blue-600 underline">Cadastre-se aqui</Link>
            </p>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

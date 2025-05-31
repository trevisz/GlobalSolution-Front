"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import React from "react";
import Link from "next/link";

export default function RegistroPage() {
  const { setUser } = useUser();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleRegistro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nome || !email) {
      alert("Preencha nome e email");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        alert(`Cadastro realizado com sucesso, ${data.nome}!`);
        router.push("/perguntas");
      } else {
        alert("Erro ao registrar");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a192f] p-4">
        <h1 className="text-3xl font-bold mb-4">Cadastro no GSQuiz</h1>
        <form onSubmit={handleRegistro} className="flex flex-col gap-2 w-80">
          <input type="text" placeholder="Nome" className="border p-2 rounded" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="email" placeholder="Email" className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Registrar</button>
        </form>
        <p className="mt-4">
          Já tem conta? <Link href="/" className="text-blue-600 underline">Faça login</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}

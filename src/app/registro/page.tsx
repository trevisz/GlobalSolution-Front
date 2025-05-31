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
  const router = useRouter();

  const handleRegistro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nome || !email) {
      alert("Preencha nome e email");
      return;
    }

    try {
      const response = await fetch("https://quarkus-app.onrender.com/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        alert(`Cadastro ou login realizado com sucesso, ${data.nome}!`);
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
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a192f] text-white p-4">
        <h1 className="text-3xl font-bold mb-4 text-[#66ccff]">Cadastro no GSQuiz</h1>
        <form onSubmit={handleRegistro} className="flex flex-col gap-2 bg-[#0d253f] p-6 rounded-xl shadow-lg w-80">
          <input type="text" placeholder="Nome" className="p-2 rounded bg-[#0a192f] text-white" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="email" placeholder="Email" className="p-2 rounded bg-[#0a192f] text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className="bg-[#66ccff] text-black p-2 rounded">Registrar</button>
        </form>
        <p className="mt-4">
          Já tem conta? <Link href="/" className="text-[#66ccff] underline">Faça login</Link>
        </p>
      </main>
      <Footer />
    </>
  );
}

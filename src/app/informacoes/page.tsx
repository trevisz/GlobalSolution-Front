"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function InformacoesPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a192f] p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Informações sobre Meio Ambiente e Sustentabilidade</h1>

        <div className="max-w-3xl text-center mb-6">
          <p className="text-lg mb-4">
            O <strong>meio ambiente</strong> é o conjunto de condições naturais e culturais que permitem a existência de vida na Terra. Cuidar dele é essencial para nossa sobrevivência.
          </p>
          <p className="text-lg mb-4">
            <strong>Sustentabilidade</strong> significa usar os recursos de forma equilibrada, garantindo que as futuras gerações também possam viver bem. É um compromisso coletivo para um mundo mais justo, saudável e resiliente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative w-80 h-60">
            <Image src="/images/natureza.jpg" alt="Natureza" fill className="rounded-lg object-cover" />
          </div>
          <div className="relative w-80 h-60">
            <Image src="/images/sustentabilidade.jpg" alt="Sustentabilidade" fill className="rounded-lg object-cover" />
          </div>
        </div>

        <div className="max-w-2xl text-center text-base text-gray-100">
          <p className="mb-4">
            🌱 <strong>Dicas para um mundo melhor:</strong>
          </p>
          <ul className="list-disc list-inside text-left">
            <li>Reduza o consumo de plástico</li>
            <li>Pratique a coleta seletiva</li>
            <li>Economize água e energia</li>
            <li>Opte por transportes sustentáveis</li>
            <li>Plante árvores e cuide das áreas verdes</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

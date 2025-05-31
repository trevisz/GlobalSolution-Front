"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function SobrePage() {
  const integrantes = [
    {
      nome: "João Victor Trevisan",
      rm: "560263",
      linkedin: "https://www.linkedin.com/in/trevisaan7/",
      github: "https://github.com/trevisz",
      foto: "/images/joaovictor.png"
    },
    {
      nome: "",
      rm: "XXXXXX",
      linkedin: "#",
      github: "#",
      foto: "/images/placeholder.jpg"
    }
  ];

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#0a192f] text-white p-4">
        <h1 className="text-3xl font-bold mb-6 text-[#66ccff]">Sobre Nós</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrantes.map((pessoa, index) => (
            <div key={index} className="bg-[#0d253f] rounded-lg p-4 shadow-md text-center max-w-xs">
              <div className="relative w-32 h-32 mx-auto mb-2 overflow-hidden rounded-full border-2 border-[#66ccff]">
                <Image src={pessoa.foto} alt={pessoa.nome} fill className="object-cover" />
              </div>
              <h2 className="text-lg font-bold">{pessoa.nome}</h2>
              <p className="text-sm">RM: {pessoa.rm}</p>
              <div className="flex justify-center gap-4 mt-2">
                <a href={pessoa.linkedin} target="_blank" className="text-[#66ccff] hover:underline">LinkedIn</a>
                <a href={pessoa.github} target="_blank" className="text-[#66ccff] hover:underline">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

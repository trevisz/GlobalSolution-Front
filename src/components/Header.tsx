"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  return (
    <header className="bg-[#0d253f] text-white p-4 flex justify-between items-center relative">
      <nav className="flex gap-4">
        {!user && <Link href="/">Início</Link>}
        <Link href="/perguntas">Perguntas</Link>
        <Link href="/resultado">Meu Ranking</Link>
        <Link href="/informacoes">Informações</Link>
        <Link href="/sobre">Sobre Nós</Link>
      </nav>

      {user && (
        <div className="relative">
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="text-sm text-white hover:text-gray-300"
          >
            {user.nome}
          </button>
          {menuAberto && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

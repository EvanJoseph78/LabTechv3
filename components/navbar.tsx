"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Melhor para navegação dinâmica
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon, ShoppingBag, UserIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthPage } from "./authpage";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const links = [
    { label: "HOME", path: "/" },
    { label: "LOJA VIRTUAL", path: "/produtos" },
    { label: "PRÓTESES", path: "/proteses" },
    { label: "SERVIÇO", path: "/servico" },
    { label: "CONTATO", path: "/contato" },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="flex justify-between items-center h-20 px-6 bg-zinc-900 text-white text-xl">
      {/* Logo */}
      <Link href="/" className="w-1/4">
        <Image
          src="/LabTech-logo.png"
          alt="LabTech Logo"
          width={200}
          height={200}
          priority
        />
      </Link>

      {/* Links de Navegação */}
      <ul className="w-1/2 flex justify-center gap-6">
        {links.map(({ label, path }) => (
          <li key={label}>
            <Link href={path}>
              <Button
                className="text-white hover:text-laranja text-xl"
                variant="ghost"
              >
                {label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>

      {/* Área de Usuário */}
      <div className="w-1/4 flex justify-end items-center gap-4">
        {/* Campo de busca */}
        <div className="relative w-52">
          <Input
            className="w-full border border-gray-600 bg-zinc-800 text-white p-2 pr-10 rounded-md focus:ring-2 focus:ring-laranja"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            aria-label="Buscar"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
          >
            <SearchIcon size={20} />
          </button>
        </div>

        {/* Ícone de usuário/Login */}
        <AuthPage></AuthPage>
        {/* <Dialog>
          <DialogTrigger aria-label="Abrir login">
            <UserIcon size={24} className="cursor-pointer hover:text-laranja transition" />
          </DialogTrigger>
          <DialogContent className="flex justify-center">
            <AuthPage />
          </DialogContent>
        </Dialog> */}

        {/* Ícone do carrinho */}
        <Link href="/cart" aria-label="Ir para o carrinho">
          <ShoppingBag size={24} className="cursor-pointer hover:text-laranja transition" />
        </Link>
      </div>
    </nav>
  );
};

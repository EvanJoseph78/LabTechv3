"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link"; // Importando Link do Next.js para navegação

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const links = [
    { label: "HOME", path: "/" },
    { label: "LOJA VIRTUAL", path: "/produtos" },
    { label: "PRÓTESES", path: "/proteses" },
    { label: "SERVIÇO", path: "/servico" },
    { label: "CONTATO", path: "/contato" },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navega para a página de pesquisa
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="flex justify-between items-center h-20 px-6 text-white bg-zinc-900 text-xl">
      {/* Logo Section */}
      <div className="w-1/4">
        <Image src="/LabTech-logo.png" alt="LabTech Logo" width={200} height={200} />
      </div>

      {/* Navigation Links */}
      <ul className="w-1/2 flex justify-center">
        {links.map(({ label, path }) => (
          <li key={label}>
            <Link href={path}>
              <Button
                className="text-white hover:bg-transparent hover:text-laranja text-xl"
                variant="ghost"
              >
                {label}
              </Button>
            </Link>
          </li>
        ))}
      </ul>

      {/* Search and User Section */}
      <div className="w-1/4 flex justify-end items-center gap-3">
        <div className="relative w-52">
          <Input
            className="w-full border border-gray-600 bg-zinc-800 text-white p-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-laranja"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
          >
            <SearchIcon />
          </button>
        </div>
        <Button size="lg" className="hover:bg-laranja">
          <UserIcon className="w-6 h-6" />
        </Button>
      </div>
    </nav>
  );
};


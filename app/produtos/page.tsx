"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "./_components/product-card";
import { fetchProducts } from "@/services/api";
import { Produto } from "@/types/produto";

export default function ProductList() {
  // Inicializando o estado com um array vazio de produtos
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // Função para buscar os produtos
  const getProducts = async () => {
    try {
      const productsList = await fetchProducts(); // Busca os produtos
      setProdutos(productsList); // Atualiza o estado com os produtos recebidos
    } catch (error) {
      console.error("Erro ao buscar produtos:", error); // Exibe erro no console, se houver
    }
  };

  // Executa o código assim que o componente for montado
  useEffect(() => {
    getProducts();
  }, []); // A dependência vazia significa que o efeito só será executado uma vez

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((product) => ( // Usando a variável 'produtos' no map
          <ProductCard key={product.idproduto} product={product} /> // Acessando o 'idproduto' para chave
        ))}
      </div>
    </div>
  );
}

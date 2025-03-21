"use client";

import { fetchSearch } from "@/services/api";
import { Produto } from "@/types/produto";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ProductCard } from "../produtos/_components/product-card";

const SearchPage = () => {
  const searchParams = useSearchParams(); 
  const query = searchParams.get("q"); // Obtém o parâmetro da query

  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função de busca encapsulada com useCallback para evitar recriação
  const buscarProdutos = useCallback(async () => {
    if (!query) return;

    setLoading(true);
    setError(null); // Reseta erro ao tentar buscar novamente

    try {
      const produtosBuscados = await fetchSearch(query);
      setListaProdutos(produtosBuscados);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
      setError("Erro ao buscar produtos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  // Executa a busca quando query mudar
  useEffect(() => {
    buscarProdutos();
  }, [buscarProdutos]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Resultados da Pesquisa</h1>
      <p className="mt-4 text-gray-600">
        Você pesquisou por:{" "}
        <span className="font-semibold">
          {query || "Nenhuma busca realizada"}
        </span>
      </p>

      <div className="container mx-auto p-4">
        {loading && <p className="text-blue-500">Carregando produtos...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && listaProdutos.length === 0 && (
          <p className="text-gray-500">Nenhum produto encontrado.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listaProdutos.map((product) => (
            <ProductCard key={product.idproduto} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

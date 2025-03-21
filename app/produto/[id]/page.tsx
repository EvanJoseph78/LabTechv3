// /app/product/[id]/page.tsx
"use client";

import { CartButton } from "@/components/carrinhoButton";
import { fetchGetProduct } from "@/services/api";
import { Produto } from "@/types/produto";
import { useState, useEffect } from "react";

interface ProductPageProps {
  params: {
    id: string; // 'id' será passado como string pela URL
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const { id } = params; // Pegando o id do parâmetro da URL

  const [product, setProduct] = useState<Produto | null>(null); // Estado para o produto
  const [loading, setLoading] = useState(true); // Estado para o carregamento
  const [error, setError] = useState<string | null>(null); // Estado para erro

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const productData = await fetchGetProduct(Number(id)); // Chamando a API para buscar o produto
          setProduct(productData);
        } catch (err) {
          setError("Erro ao carregar o produto");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Produto não encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Imagem do produto */}
          <div className="w-full md:w-1/2 p-6">
            <img
              src={product.urlimg}
              alt={product.nome}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Informações do produto */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              {product.nome}
            </h1>
            <p className="text-gray-600 text-sm line-clamp-4 mb-6">
              {product.descricao}
            </p>
            <p className="text-lg font-semibold text-orange-500 mb-6">
              R$ {parseFloat(product.valor).toFixed(2)}
            </p>

            {/* Botões */}
            <div className="flex gap-4 mt-auto">
              <CartButton product={product}></CartButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

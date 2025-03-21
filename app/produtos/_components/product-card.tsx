import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Produto } from "@/types/produto";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // Melhor para navegação dinâmica

interface ProductCardProps {
  product: Produto;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleRedirect = (idproduto: number) => {
    router.push(`/produto/${idproduto}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast("Produto adicionado ao carrinho", {
      description: `${product.nome} foi adicionado.`,
      action: {
        label: "🛍️ Ver carrinho",
        onClick: () => router.push("/cart"),
      },
    });
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/cart"); // Redireciona diretamente para o carrinho após adicionar
  };

  const handleShowMore = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o evento de clique se propague e redirecione
    setShowTooltip(!showTooltip);
  };

  return (
    <div className="relative border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <img
        src={product.urlimg}
        alt={product.nome}
        className="rounded-md mb-4 w-full h-48 object-cover"
        onClick={() => handleRedirect(product.idproduto)} // Passa o idproduto corretamente
      />
      <div
        className="flex flex-col flex-grow"
        onClick={() => handleRedirect(product.idproduto)} // Passa o idproduto corretamente
      >
        <h2 className="text-xl font-semibold mb-2">{product.nome}</h2>

        {/* Descrição com limite de 3 linhas */}
        <div className="text-sm text-gray-600 mt-1 line-clamp-3">
          {product.descricao}
        </div>

        {/* Botão para exibir tooltip */}
        {product.descricao.length > 120 && (
          <button
            onClick={handleShowMore} // Use handleShowMore para evitar redirecionamento
            className="text-blue-500 text-xs mt-1 underline self-start"
          >
            {showTooltip ? "Fechar" : "Ver mais"}
          </button>
        )}

        {/* Tooltip flutuante */}
        {showTooltip && (
          <div className="absolute top-0 left-0 right-0 bg-white p-4 border border-gray-300 shadow-lg rounded-lg z-10">
            <p className="text-gray-800 text-sm">{product.descricao}</p>
          </div>
        )}

        <p className="text-lg font-bold text-laranja my-4">
          R$ {parseFloat(product.valor).toFixed(2)}
        </p>
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <Button
          className="w-full bg-laranja text-white hover:bg-orange-600"
          onClick={handleAddToCart}
        >
          Adicionar ao Carrinho
        </Button>

        <Button
          className="w-full bg-black text-white hover:bg-gray-700"
          onClick={handleBuyNow}
        >
          Comprar Agora
        </Button>
      </div>
    </div>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Produto } from "@/types/produto";

interface CartButtonProps {
  product: Produto | null;
  onAddToCart?: (product: Produto) => void;
  onBuyNow?: (product: Produto) => void;
}

export const CartButton = ({ product, onAddToCart, onBuyNow }: CartButtonProps) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast("Produto adicionado ao carrinho", {
        description: `${product.nome} foi adicionado.`,
        action: {
          label: "🛍️ Ver carrinho",
          onClick: () => router.push("/cart"),
        },
      });
      if (onAddToCart) onAddToCart(product); // Aciona o callback, se fornecido
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      router.push("/cart");
      if (onBuyNow) onBuyNow(product); // Aciona o callback, se fornecido
    }
  };

  return (
    <div className="flex gap-4">
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
  );
};

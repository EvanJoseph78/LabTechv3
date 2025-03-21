"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

export default function CartPage() {
  const router = useRouter();

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    fazerPedido,
  } = useCart();

  const finalizarCompra = () => {
    fazerPedido();
    toast("✅ Compra finalizada");
    router.push("/produtos");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.idproduto}
              className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-md"
            >
              <img
                src={item.urlimg}
                alt={item.nome}
                className="w-20 h-20 rounded-md object-cover"
              />

              <div className="flex-1 px-4">
                <h2 className="text-lg font-semibold">{item.nome}</h2>
                <p className="text-gray-600">{item.descricao}</p>
                <p className="text-lg font-bold text-laranja">
                  ${parseFloat(item.valor).toFixed(2)}
                </p>
              </div>

              {/* Controles de quantidade */}
              <div className="flex items-center space-x-2">
                <Button
                  className="bg-gray-300 text-black px-3 py-1 rounded-md hover:bg-gray-400"
                  onClick={() => decreaseQuantity(item.idproduto)}
                >
                  -
                </Button>
                <span className="text-lg font-semibold">{item.quantidade}</span>
                <Button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  onClick={() => increaseQuantity(item.idproduto)}
                >
                  +
                </Button>
              </div>

              <Button
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                onClick={() => removeFromCart(item.idproduto)}
              >
                Remover
              </Button>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-6">
            Total: $
            {cart
              .reduce(
                (total, item) =>
                  total + parseFloat(item.valor) * item.quantidade,
                0
              )
              .toFixed(2)}
          </div>
          <Button
            className="w-full bg-green-500 text-white py-2 mt-4 hover:bg-green-600"
            onClick={finalizarCompra}
          >
            Finalizar Compra
          </Button>
        </div>
      )}
    </div>
  );
}

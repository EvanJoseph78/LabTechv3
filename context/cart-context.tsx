"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Produto } from "@/types/produto";
import { fetchCriarPedido } from "@/services/api";
import { Pedido, ProdutoPedido } from "@/types/pedido";

interface CartContextProps {
  cart: Produto[];
  addToCart: (product: Produto) => void;
  removeFromCart: (idproduto: number) => void;
  increaseQuantity: (idproduto: number) => void;
  decreaseQuantity: (idproduto: number) => void;
  fazerPedido: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Produto[]>([]);

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Salvar carrinho no localStorage sempre que ele for atualizado
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Adicionar item ao carrinho
  const addToCart = (product: Produto) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find(
        (item) => item.idproduto === product.idproduto
      );
      if (itemExists) {
        return prevCart.map((item) =>
          item.idproduto === product.idproduto
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantidade: 1 }];
      }
    });
  };

  // Remover item do carrinho
  const removeFromCart = (idproduto: number) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.idproduto !== idproduto)
    );
  };

  // Aumentar a quantidade de um produto
  const increaseQuantity = (idproduto: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idproduto === idproduto
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  };

  // Diminuir a quantidade de um produto (remove se chegar a 0)
  const decreaseQuantity = (idproduto: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.idproduto === idproduto
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const fazerPedido = async () => {
    // Mapeia os itens do carrinho para o formato ProdutoPedido
    const listaPedidos: ProdutoPedido[] = cart.map((item) => ({
      idProduto: item.idproduto, // Converte o ID do produto para string
      quantidadeProduto: item.quantidade, // Quantidade do produto
      subtotal: parseFloat(item.valor) * item.quantidade, // Calcula o subtotal
    }));
  
    // Calcula o valor total do pedido (somando os subtotais)
    const valorTotalPedido = listaPedidos.reduce(
      (total, item) => total + item.subtotal,
      0
    );
  
    // Valor do frete (pode ser fixo ou calculado de outra forma)
    const valorFrete = 50.0; // Exemplo de valor fixo
  
    // Cria o objeto pedido com as informações necessárias
    const pedido: Pedido = {
      idcliente: "1", // Substitua por um valor dinâmico quando o usuário estiver logado
      valorTotalPedido: valorTotalPedido,
      valorFrete: valorFrete,
      produtos: listaPedidos, // Usando o array de ProdutoPedido
    };
  
    console.log("Pedido:", pedido);
  
    try {
      // Faz a requisição para criar o pedido
      await fetchCriarPedido(pedido);
  
      // Se o pedido for criado com sucesso, esvazia o carrinho
      setCart([]);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      // Aqui você pode adicionar tratamento de erro se necessário
    }
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        fazerPedido,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

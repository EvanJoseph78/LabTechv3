import { fazerPedido } from "@/models/pedidoModel";
import { Pedido } from "@/types/pedido"; // Importa o tipo Pedido

// Função para criar um pedido
export const criarPedido = async (pedido: Pedido) => {
  try {
    // Chama a função do serviço para fazer o pedido, passando o objeto inteiro pedido

    const ordem_id = await fazerPedido(pedido);
    
    // Retorna o ID da ordem gerado
    return { sucesso: true, ordem_id };
  } catch (err: any) {
    console.error("Erro ao criar pedido:", err);
    return { sucesso: false, erro: err.message };
  }
};

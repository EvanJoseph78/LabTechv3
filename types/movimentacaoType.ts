export type MovimentacaoType = {
    idproduto: string;
  data_pedido: string; // Data do pedido em formato ISO (pode ser uma string ou um tipo Date)
  classificacao: string; // Classificação do produto (por exemplo, "Prótese")
  nome: string; // Nome do produto
  quantidade: number; // Quantidade de produtos
  custo_unitario: string; // Custo unitário do produto (em formato string, pode ser convertido para número se necessário)
  subtotal: string; // Subtotal (valor total) do pedido (também em formato string)
};

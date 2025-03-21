export type ProdutoPedido = {
  idProduto: number; // ID do produto (como string, conforme seu exemplo)
  quantidadeProduto: number; // Quantidade do produto
  subtotal: number; // Subtotal do produto (quantidade * preço unitário)
};
export type Pedido = {
  idcliente: string; // ID do cliente, mantido como string
  valorTotalPedido: number; // Valor total do pedido
  valorFrete: number; // Valor do frete
  produtos: ProdutoPedido[]; // Lista de produtos no pedido, com o tipo ProdutoPedido
};

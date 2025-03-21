import pool from "@/services/db";
import { Pedido } from "@/types/pedido";

export const fazerPedido = async (pedido: Pedido): Promise<number> => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();  // Inicia a transação

    // Extraindo os dados do pedido corretamente
    const { idcliente, valorTotalPedido, valorFrete, produtos } = pedido;

    // Inserir a ordem de pedido
    const [result] = await connection.query(
      "CALL inserir_ordem_pedido(?, ?, ?, @ordem_pedido_id)",
      [idcliente, valorTotalPedido, valorFrete]
    );

    // Obter o ID da ordem inserida
    const [idResult]: any = await connection.query("SELECT @ordem_pedido_id AS ordem_id");
    const ordem_id = idResult[0].ordem_id;

    // Iterar sobre a lista de produtos e inserir cada um na tabela produto_ordem_pedido
    for (const item of produtos) {
      const { idProduto, quantidadeProduto, subtotal } = item;

      // Inserir o produto na ordem de pedido
      await connection.query(
        "CALL inserir_produto_ordem_pedido(?, ?, ?, ?)",
        [ordem_id, idProduto, quantidadeProduto, subtotal]
      );
    }

    // Realiza o commit para garantir que todas as alterações sejam aplicadas
    await connection.commit();

    // Retorna o ID da ordem inserida
    return ordem_id;
  } catch (err) {
    if (connection) {
      await connection.rollback();  // Reverte todas as operações da transação em caso de erro
    }
    console.error('Erro ao fazer pedido:', err);
    throw err;  // Lança o erro para ser tratado em outro nível, caso necessário
  } finally {
    if (connection) {
      connection.release();  // Libera a conexão ao final do processo
    }
  }
};

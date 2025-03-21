
import { Produto } from '@/types/produto';
import pool from '../services/db';

export const getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM produto');
  return rows;
};

// Função para buscar o produto pelo id
export const getProductById = async (id: number): Promise<Produto | null> => {
  const [rows] = await pool.execute(
    'SELECT * FROM produto WHERE idproduto = ?',
    [id]
  ) as [Produto[], any];  // Especificando que o resultado será um array de produtos
  
  // Verifica se o produto foi encontrado
  if (rows.length === 0) {
    return null;
  }

  return rows[0]; // Retorna o primeiro produto encontrado
};

export const searchProduto = async (query: string) => {
  const [results] = await pool.execute(
    'SELECT * FROM produto WHERE MATCH(nome, descricao) AGAINST (? IN NATURAL LANGUAGE MODE)',
    [query]
  )
  
  return results;
};
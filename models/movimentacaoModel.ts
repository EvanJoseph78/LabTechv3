import pool from "../services/db";
import { Produto } from "@/types/produto";

// Função para buscar todos os produtos da VIEW de estoque
export const getMovimentacao = async (): Promise<Produto[]> => {
  const [rows] = await pool.query("SELECT * FROM movimentacao_saida");
  return rows as Produto[];
};

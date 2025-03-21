import pool from "../services/db";
import { Produto } from "@/types/produto";

// Função para buscar todos os produtos da VIEW de estoque
export const getEstoque = async (): Promise<Produto[]> => {
  const [rows] = await pool.query("SELECT * FROM view_estoque");
  return rows as Produto[];
};
